import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Freedomistan = () => {
  const {id} = useParams();
  let [tutorial, setTutorial] = useState([])
  let [totalcount, setTotalCount] = useState([])
  let [deletemovieid, setDeleteMovieID] = useState([])
  let {authTokens, logoutUser, user} = useContext(AuthContext)
  const navigate = useNavigate();

  let getCount = async() => {
      let response2 = await fetch('http://127.0.0.1:8000/api/tutorials/total', {
              method:'GET',})
              let data2 = await response2.json()
              setTotalCount(data2)
  }

  useEffect(()=> {
      getTuts();
      getCount();
  }, [])

  let getTuts = async() => {
    console.log('THis is your ID: ',id)
    let response2 = await fetch('http://127.0.0.1:8000/api/pledge/'+id, {
        method:'GET',})

        let data2 = await response2.json()
        setTutorial(data2)
  }


  let deletemovie = async (tut)=> {
    // e.preventDefault()
    console.log(tut.id)
    let responsedel = await fetch('http://127.0.0.1:8000/api/tutorials/'+tut.id, { 
        method: 'PUT' })
    getTuts();
    getCount();
}

  const handleDeleteMovie = (e) => {
      setDeleteMovieID(e);
  }

  let makemovie = async (e)=> {
      e.preventDefault()
      console.log(e.target.plan.value)
      let response = await fetch('http://127.0.0.1:8000/api/tutorials/', {
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              'income':e.target.income.value, 
              'description':e.target.description.value,
              'user':user.user_id,
              'plan':e.target.plan.value
          })
          
      })
      e.target.reset();
      getTuts();
      getCount();
  }

  let editpledge = async (tut)=> {
    console.log(tutorial[0].id)
    console.log('LOOK HERE', tut.target.income.value, tut.target.description.value, tut.target.plan.value)
    let response = await fetch('http://127.0.0.1:8000/api/tutorials/'+tutorial[0].id+"/", {
        method:'PUT',
        body:JSON.stringify({
            'income':tut.target.income.value, 
            'description':tut.target.description.value,
            'plan':tut.target.plan.value
        })
        
    })
    getTuts();
}

  return (
    <div>
{ user.user_id == id ?
<div>
    { tutorial.length == 0 ?
    <div>
        <Form onSubmit={makemovie} > 

        <Container className="justify-content-md-center w-75" fluid="md">
            <Form.Group className="mb-3" controlId="income">
                <Form.Label>Twitter handle (or other social media handle/url)</Form.Label>
                <Form.Control type="text" id="income"  name="income" placeholder="Twitter handle" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>List things you want at Freedomistan! </Form.Label>
                <Form.Control type="text" id="description" name="description" placeholder="rv park, gun range, thrift shop, etc." />
            </Form.Group>
            <Form.Label>How much will you pay for Freedom? </Form.Label>
            <Form.Select aria-label="Default select example" id="plan" name="plan" placeholder="plan">
                <option value="One Night">$100 One Night premium stay: Founders Membership </option>
                <option value="Weekend">$500 Opening Weekend stay: VIP Membership</option>
                <option value="Invester">>$5,000 Invester: Leadership Role</option>
            </Form.Select>
            <br></br>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Container>
        </Form>
    </div>
    :
    <div>
    <Form onSubmit={editpledge} > 
        <Container className="justify-content-md-center w-75" fluid="md">
            <Form.Group className="mb-3" controlId="income">
                <Form.Label>Twitter handle (or other social media handle/url)</Form.Label>
                <Form.Control type="text" id="income"  name="income" placeholder={tutorial[0].income} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>List things you want at Freedomistan! </Form.Label>
                <Form.Control type="text" id="description" name="description" placeholder={tutorial[0].description} />
            </Form.Group>
            <Form.Label>How much will you pay for Freedom? </Form.Label>
            <Form.Select aria-label="Default select example" id="plan" name="plan" placeholder="plan">
                <option selected>{tutorial[0].plan}</option>
                <option value="One Night">$100 One Night premium stay: Founders Membership </option>
                <option value="Weekend">$500 Opening Weekend stay: VIP Membership</option>
                <option value="Invester">>$5,000 Invester: Leadership Role</option>
            </Form.Select>
            <br></br>
            <Button variant="success" type="submit">
                Edit
            </Button>
        </Container>
    </Form>
    </div>
    }
    </div>

:

<div>
<Container>
        {tutorial.map(tut => (
            <div key={tut.id} >
               <h3> {tut.income}  </h3> 
                <h4> {tut.description}  </h4>
            </div>
        ))}
    </Container>
</div>


}
    </div>
  )
}

export default Freedomistan
