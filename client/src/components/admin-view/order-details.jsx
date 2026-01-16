import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "../../store/admin/order-slice";
import { useToast } from "../../hooks/use-toast";

const initialFormData = {
  status: '',
};

const AdminOrderDetailsView = ({ orderDetails }) => {

  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast()

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;
    
    if (status.trim().length === 0) {
      toast({
        title: "All fields are required",
      });
      return;
    }
    
    dispatch(updateOrderStatus({ id : orderDetails._id, orderStatus: status})).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());        
        setFormData(initialFormData);
        toast({
          title: "Order status updated successfully",
        });
      }
    });
  }

  return (
    <DialogContent className=" bg-white sm:max-w-[600px] max-h-[95vh] overflow-y-auto sm:rounded-2xl ">
      <div className="grid gap-4">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p>Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p>Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p>Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p>Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p>Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p>Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 text-white ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500 hover:bg-green-600 "
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600 hover:bg-red-700 "
                    : "bg-black hover:bg-black "
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-bold">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li
                      key={item._id}
                      className="flex items-center justify-between"
                    >
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-bold">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <div className="flex mt-2 items-center justify-between">
                <p>Name</p>
                <Label>{user.username}</Label>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p>Address</p>
                <Label> {orderDetails?.addressInfo?.address}</Label>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p>City</p>
                <Label> {orderDetails?.addressInfo?.city}</Label>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p>Pincode</p>
                <Label> {orderDetails?.addressInfo?.pincode}</Label>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p>Phone</p>
                <Label> {orderDetails?.addressInfo?.phone}</Label>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p>Notes</p>
                <Label> {orderDetails?.addressInfo?.notes}</Label>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={`Update Order Status`}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
