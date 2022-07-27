import React, { Component } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import CrudService from '../../Service/CrudService';

const service = new CrudService();

export default class Products extends Component {

    constructor() {
        super();
        this.state =
            {
                ProductId:'',
                ProductName: '',
                Quantity: '',
                DataRecord:[],
                UpdateFlag:false
            }
    }


    componentWillMount(){
        console.log("componentwilllmount called..");
        this.ReadRecord();
    }

    ReadRecord(){
        service.ReadRecord().then((data)=>{
            console.log(data)
            console.log(data.data)
            this.setState({DataRecord:data.data})
        }).catch((error)=>{
            console.log(error)
        })
    }


    handleChange =(Event) =>{
        const {name, value} = Event.target;
        this.setState({[name]:value},()=> {console.log(this.state)});
    }

    HandliClick =() =>{
        if(this.state.ProductName == '' || this.state.Quantity == ''){
            console.log("Input Field Is Empty");
            return;
        }
        console.log("data: ", this.state)

        if(this.state.UpdateFlag === false)
        {
        const data={
            name: this.state.ProductName,
            quantity: Number(this.state.Quantity),
        }
        service.CreateRecord(data).then((data)=>{
            console.log(data)
            this.ReadRecord()
        }).catch((error)=>{
            console.log(error)
        })
    }else{
        const data={
            id:Number(this.state.ProductId),
            productName: this.state.ProductName,
            quantity: Number(this.state.Quantity)
        }

        service.UpdateRecord(data).then((data)=>{
            console.log(data)
        }).catch((error)=>{
            console.log(error)
        })
    }
    this.setState({UpdateFlag:false, ProductName:'', Quantity:''})
    }


    handleEdit =(data)=>{
        this.setState({ProductName:data.name, Quantity:data.quantity, ProductId:data.id, UpdateFlag:true})
    }


    render() {
        let state = this.state;
        let self= this;
        return (
            <div>
                <div>
                    <br></br>
                    <TextField 
                        id="outlined-basic" 
                        label="ProductName" 
                        name='ProductName' 
                        size='small' 
                        variant="outlined" 
                        value={state.ProductName}
                        onChange={this.handleChange}
                    />
                    <br></br><br></br>
                    <TextField 
                        id="outlined-basic" 
                        label="Quantity" 
                        name='Quantity' 
                        size='small' 
                        variant="outlined" 
                        value={state.Quantity}
                        onChange={this.handleChange}
                    />
                    <br></br><br></br>
                    <Button variant="contained" color="secondary" onClick={this.HandliClick}>
                        Save
                    </Button>
                </div>

                <div>
                <Table striped bordered hover>
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Produt Name</th>
                                    <th>Quantity</th>
                                  </tr>
                                </thead>
                                <tbody>
                    {

                        this.state.DataRecord.map(function(data,index){
                            return(
                                

                                <tr>
                                 <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.quantity}</td>
                                <td>
                                <Button variant="outlined" onClick={()=>{self.handleEdit(data)}}>Edit</Button>
                                </td>
                                <td>
                                <Button variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                                </td>
                                </tr>
                          
                            )
                        })
                    }
                    </tbody>
                          </Table>
                </div>
            </div>
        )
    }
}
