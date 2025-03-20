import { Button } from '@/components/ui/button';
import { ConnectionType } from '@/lib/types'
import Image from 'next/image';
import React from 'react'

type Props = {
    type: ConnectionType;
    icon?: string;
    title: ConnectionType;
    description: string;
    callback?: () => void;
    connected: any;
}

const ConnectionCard: React.FC<Props> = ({
    type,
    icon,
    title,
    description,
    callback,
    connected

}) => {
  return (
    <div className="border m-3  p-6 w-max-[450px]  rounded-md shadow-md flex flex-col items-center">
      <Image src={icon as string} alt={title} width={40} height={40} />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      
      <Button onClick={callback} 
      variant={"secondary"}
        className={`mt-4 px-4 py-2 rounded-md hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all  text-white ${
          connected ? 'bg-green-500' : 'bg-blue-500'
        }`}>{connected ? "Connected" : "Connect"}</Button>
    </div>
  )
}

export default ConnectionCard
