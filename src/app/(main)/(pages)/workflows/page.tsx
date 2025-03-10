
import WorkflowButton from "./_components/workflow-button"

type Props = {}

const WorkflowsPage = (props: Props) => {
  return (
    <div className=' flex flex-col gap-4 relative '>
        <h1 className=' justify-between text-3xl sticky top-0 z-[10] p-4 bg-background/50 backdrop-blur-lg flex items-center border-b '>
        Workflows
        <WorkflowButton/>
        </h1>

        
    
    </div>
  )
}

export default WorkflowsPage