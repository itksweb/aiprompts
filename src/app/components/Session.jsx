import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Session = async () => {
  const session = await getServerSession(authOptions);
  return (
    <section>
      <h2>Server Side Rendered Session</h2>
      <h2>{JSON.stringify(session)}</h2>
    </section>
  );
};

export default Session;
