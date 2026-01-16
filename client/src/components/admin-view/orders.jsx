import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import AdminOrderDetailsView from "./order-details"
import { Badge } from "../ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "../../store/admin/order-slice"

const AdminOrdersView = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const dispatch = useDispatch();
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }


  useEffect(() => {
    dispatch(getAllOrdersForAdmin())
  }, [dispatch])

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails])
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem?._id} >
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 text-white ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500 hover:bg-green-600 "
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600 hover:bg-red-700 "
                            : "bg-black hover:bg-black "
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <DialogTitle className="hidden" >Order Details</DialogTitle>
                          <DialogTrigger>
                            <Button
                            onClick={() =>
                              handleFetchOrderDetails(orderItem?._id)
                            }
                            className="bg-black text-white hover:bg-black rounded-xl hover:text-white"
                          >
                            View Details
                          </Button>
                          </DialogTrigger>
                          <DialogContent className=" bg-white sm:max-w-[600px] overflow-hidden sm:rounded-2xl " >
                            <AdminOrderDetailsView
                              orderDetails={orderDetails}
                            />
                          </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AdminOrdersView