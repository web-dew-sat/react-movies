import './App.css';
import {Fragment} from "react";
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import Main from "../../layout/Main/Main";

function App() {
    return (
        <Fragment>
            <Header/>
            <Main />
            <Footer/>
        </Fragment>
    );
}

export default App;
