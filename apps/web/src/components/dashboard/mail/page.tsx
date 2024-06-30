import { cookies } from "next/headers";
import Image from "next/image";

import { Mail } from "./components/mail";
import { accounts, mails } from "./data";

export default function MailPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  return (
    <>
      <div className="w-full">
        <Mail
          accounts={accounts}
          mails={mails}
          navCollapsedSize={4}
          defaultLayout={[]}
        />
      </div>
    </>
  );
}
