import { useState, useEffect } from 'react'
import { HStack, useToast, VStack } from "native-base";
import { Header } from "../components/Header";

import { Share } from 'react-native'

import { api } from '../services/api'

import { useRoute } from '@react-navigation/native'
import { Loading } from '../components/Loading';
import { Option } from '../components/Option';
import { Guesses } from '../components/Guesses';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';

import { PoolCardPros } from '../components/PoolCard'
import { PoolHeader } from '../components/PoolHeader';

interface RouteParams {
    id: string;
}

export function Details() {

    const toast = useToast()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ optionSelected, setOptionSelectedg ] = useState<'guesses' | 'ranking'>('guesses' )
    const [ poolDetails, setPoolDetails ] = useState<PoolCardPros>({} as PoolCardPros)

    const route = useRoute()
    const {id} = route.params as RouteParams

    async function fetchPoolDetails() {
        try {
            setIsLoading(false)

            const response = await api.get(`/pools/${id}`)
            setPoolDetails(response.data.pool)

        } catch (error) {
            console.log(error)
            toast.show({
                title: "Não foi possível carregar os detalhes do bolão",
                placement: 'top',
                bgColor: 'green.500'
            }) 

        } finally {
            setIsLoading(false)
        }
    }

    async function handleCodeShare() {
       await Share.share({
            message: poolDetails.code
        })
    }

    useEffect(() => {
        fetchPoolDetails()
    }, [id])

    if(isLoading){
        return <Loading />
    }

    return (
        <VStack flex={1} bg="gray.700">
            <Header 
            title={poolDetails.title}
             showBackButton 
             showShareButton
             onShare={handleCodeShare}
             />
        {
            poolDetails._count?.participants > 0 ?
            <VStack px={5} flex={1}>
                <PoolHeader data={poolDetails} />
                <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                    <Option title="Seus palpites" isSelected={optionSelected === 'guesses'} onPress={() => setOptionSelectedg('guesses')}/>
                    <Option title="Ranking do grupo" isSelected={optionSelected === 'ranking'} onPress={() => setOptionSelectedg('ranking')}/>
                </HStack>

                <Guesses poolId={poolDetails.id} code={poolDetails.code}/>
            </VStack>
            : <EmptyMyPoolList code={poolDetails.code}/>
        }

        </VStack>
    )
}