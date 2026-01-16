import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Label } from "../ui/label"

const AddressCard = ({addressInfo,handleEditAddress,handleDeleteAddress, currentSelectedAddress ,setCurrentSelectedAddress}) => {
  return (
    <Card 
      onClick={ setCurrentSelectedAddress ? ()=>setCurrentSelectedAddress(addressInfo) : null }
      className={`shadow-lg ${currentSelectedAddress === addressInfo ? 'border-2 border-black' : ''}`}>
      <CardContent className=" grid gap-4 p-3"  >
        <Label> Address : {addressInfo?.address} </Label>
        <Label> City :{addressInfo?.city} </Label>
        <Label> Pincode : {addressInfo?.pincode} </Label>
        <Label> Phone : {addressInfo?.phone} </Label>
        <Label> Notes : {addressInfo?.notes} </Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between" >
        <Button
          onClick={()=>handleEditAddress(addressInfo)}
          className=" bg-black text-white hover:bg-black rounded-xl hover:text-white" >Edit</Button>
        <Button
          onClick={()=>handleDeleteAddress(addressInfo)}
          className=" bg-red-500 text-white hover:bg-red-600 rounded-xl hover:text-white">Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default AddressCard