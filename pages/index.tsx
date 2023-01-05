import Layout from "../components/layout";
import Header from "../components/header";
import Dialogue from "../components/dialogue";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <Dialogue />
      </div>
    </Layout>
  )
 
}
