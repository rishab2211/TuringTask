import { ConnectionsProvider } from "@/provider/connections-provider";
import EditorProvider from "@/provider/editor-provider";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="h-full">
      <EditorProvider>
        <ConnectionsProvider>
          <div></div>
        </ConnectionsProvider>
      </EditorProvider>
    </div>
  );
};

export default Page;
