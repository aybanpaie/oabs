import { BrowserRouter, Routes, Route} from 'react-router-dom'

import MainLogin from './mainadminpage/components/MainLogin'
import MainRegister from './mainadminpage/components/MainRegister'

import MainDashboard from './mainadminpage/MainDashboard'
import MainDocuments from './mainadminpage/MainDocuments'
import MainDocCategory from './mainadminpage/MainDocCategory'
import MainDocForms from './mainadminpage/MainDocForms'
import MainFieldGroups from './mainadminpage/MainFieldGroups'
import MainFieldOptions from './mainadminpage/MainFieldOptions'
import MainRequests from './mainadminpage/MainRequests'
import MainPayments from './mainadminpage/MainPayments'
import MainTrasanctions from './mainadminpage/MainTrasanctions'
import MainRoles from './mainadminpage/MainRoles'
import MainUsers from './mainadminpage/MainUsers'
import MainLogAudits from './mainadminpage/MainLogAudits'

import UserRegister from './userpages/components/UserRegister'
import UserLogin from './userpages/components/UserLogin'

// --------------------------------------------------------

import Loginfinal from './userpages/components/Loginfinal'
import Creatw from './userpages/components/Creatw'
import Forgot from './userpages/components/Forgot'

import Home from './pages/Home'
import Requirements from './pages/Requirements'
import Tracking from './pages/Tracking'
import ContactUs from './pages/ContactUs'
import About from './pages/About'

import TestCode from './userpages/TestCode'
import Dashboard from './userpages/DashboardUser'
import Checklist from './userpages/ApplicationChecklist'
import NewApplication from './userpages/NewApplication'
import Renewal from './userpages/Renewal'
import Transaction from './userpages/Transaction'
import Downloadables from './userpages/Downloadables'
import Forms from './userpages/Forms'
import BrgyClearance from './userpages/documentz/BrgyClearance'


function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/oabps/main/login' element={<MainLogin/>}></Route>
        <Route path='/oabps/main/register' element={<MainRegister/>}></Route>

        <Route path='/oabps/main/dashboard' element={<MainDashboard/>}></Route>
        <Route path='/oabps/main/documents' element={<MainDocuments/>}></Route>
        <Route path='/oabps/main/documentcategory' element={<MainDocCategory/>}></Route>
        <Route path='/oabps/main/documentforms' element={<MainDocForms/>}></Route>
        <Route path='/oabps/main/fieldgroups' element={<MainFieldGroups/>}></Route>
        <Route path='/oabps/main/fieldoptions' element={<MainFieldOptions/>}></Route>
        <Route path='/oabps/main/requests' element={<MainRequests/>}></Route>
        <Route path='/oabps/main/payments' element={<MainPayments/>}></Route>
        <Route path='/oabps/main/transactions' element={<MainTrasanctions/>}></Route>
        <Route path='/oabps/main/roles' element={<MainRoles/>}></Route>
        <Route path='/oabps/main/users' element={<MainUsers/>}></Route>
        <Route path='/oabps/main/logaudits' element={<MainLogAudits/>}></Route>

        <Route path='/oabps/user/register' element={<UserRegister/>}></Route>
        <Route path='/oabps/user/login' element={<UserLogin/>}></Route>

        {/* ----------------------------------------------------------- */}

        <Route path='/loginfinal/user' element={<Loginfinal/>}></Route>
        <Route path='/create/user' element={<Creatw/>}></Route>
        <Route path='/forgot/user' element={<Forgot/>}></Route>

        

        <Route path='/' element={<Home/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/requirements' element={<Requirements/>}></Route>
        <Route path='/tracking' element={<Tracking/>}></Route>
        <Route path='/contactus' element={<ContactUs/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        
        <Route path='/testcode' element={<TestCode/>}></Route>
        <Route path='/dasboard' element={<Dashboard/>}></Route>
        <Route path='/business/new-application/checklist' element={<Checklist/>}></Route>
        <Route path='/business/new-application/new' element={<NewApplication/>}></Route>
        <Route path='/business/renewal' element={<Renewal/>}></Route>
        <Route path='/transactions/my-transactions' element={<Transaction/>}></Route>
        <Route path='/documents/downloadables' element={<Downloadables/>}></Route>
        <Route path='/documents/forms' element={<Forms/>}></Route>


        <Route path='/requirements/brgyclearance' element={<BrgyClearance />}></Route>
        
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;