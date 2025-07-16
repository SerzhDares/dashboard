import { Header } from "../Header/Header";
import { DataTable } from "../DataTable/DataTable";
import { TextBlock } from "../TextBlock/TextBlock";
import { DataBarChart } from "../Charts/DataBarChart/DataBarChart";
import { DataPieChart } from "../Charts/DataPieChart/DataPieChart";
import { Footer } from "../Footer/Footer";
import './dashboard.css'

export const Dashboard: React.FC = () => {
  return (
    <div>
        <Header/>
        <main className="main">
          <section className="table_text_block">
            <DataTable/>
            <TextBlock/>
          </section>
          <div className="visualization_block">
              <DataBarChart/>
              <DataPieChart/>
          </div>
        </main>
        <Footer/>
    </div>    
  )
}
