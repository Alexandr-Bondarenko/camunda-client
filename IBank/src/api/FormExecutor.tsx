import React from 'react'
import { LoadAppState } from '../containers/components/LoadAppState'
import { useParams } from 'react-router'

interface IProps {
    instanceId: string
}

export const FormExecutor = () => {

    const { instanceId, businessKey } = useParams();
    //console.log('FormExecutor', instanceId);


    return (<>
        <LoadAppState instanceId={instanceId ? instanceId : ''} businessKey={businessKey ? businessKey : ''} />
    </>

    )

}