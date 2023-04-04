import { Navigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useLazyGetStocksDataQuery, useGetAllHoldingsQuery } from 'services/api'
import { isNullOrEmpty } from 'util/utility'
import { GenerateHoldingsData } from './helper-functions'
import { addHoldingsData } from 'services/holding-slice'
import { useDispatch } from 'react-redux'
import { setIsLoading, isLoading } from 'services/app-slice'
import { CircularProgress, Stack } from '@mui/material'
import { useSelector } from 'react-redux'

export const PrivateRouteWrapper = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const [triggerGetStocksData, stocksApi] = useLazyGetStocksDataQuery()
    const holdingsApi = useGetAllHoldingsQuery()
    const dispatch = useDispatch()
    const isAppLoading = useSelector(isLoading)

    useEffect(() => {
        if (
            !isNullOrEmpty(holdingsApi.data) &&
            holdingsApi.status !== 'pending'
        ) {
            const tickers = holdingsApi.data.map((r) => r.ticker).join(',')
            triggerGetStocksData(tickers)
        } else if (holdingsApi.status === 'fulfilled') {
            dispatch(setIsLoading(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [holdingsApi.status])

    useEffect(() => {
        if (
            !isNullOrEmpty(stocksApi.data) &&
            holdingsApi.data?.length === stocksApi.data?.length
        ) {
            dispatch(setIsLoading(false))
            const data = GenerateHoldingsData(holdingsApi.data, stocksApi.data)
            dispatch(addHoldingsData(data))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stocksApi.status, stocksApi.data, holdingsApi.data])

    const renderPrivate = () => {
        if (isAppLoading) {
            return (
                <Stack
                    width="100%"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="background.main"
                >
                    <CircularProgress />
                </Stack>
            )
        } else if (isLoggedIn) {
            return <Outlet />
        } else {
            return <Navigate to={'/login'} />
        }
    }

    return renderPrivate()
}
export default PrivateRouteWrapper
