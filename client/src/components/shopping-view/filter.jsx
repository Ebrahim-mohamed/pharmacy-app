import { filterOptions } from "../../config"
import { Label } from "../ui/label"
import { Checkbox } from '../ui/checkbox'
import { Fragment } from "react"
import { Separator } from "../ui/separator"
const ProductFilter = ({handleFilter, filters}) => {
  return (
    <div className='bg-background rounded-lg shadow-sm'>
      <div className="p-4 border-b">
        <h2 className=' text-lg font-extrabold'>
          { Object.keys(filterOptions).map(keyItem => 
            <Fragment key={keyItem}>
              <div>
                <h3 className='text-base font-bold'>{keyItem}</h3>
                <div className='grid gap-2 my-3' >
                  {
                    filterOptions[keyItem].map(option =>
                      <Label key={option.id} className="flex items-center gap-2 mb-2 font-medium" >
                        <Checkbox 
                        checked= { filters && filters[keyItem] && filters[keyItem]?.indexOf(option.id) > -1}
                        onCheckedChange={()=> handleFilter(keyItem, option.id)} />
                        {option.label}
                      </Label>
                    )
                  }
                </div>
              </div>
              <Separator className="my-2" />
            </Fragment>
            ) 
          }
        </h2>
      </div>
    </div>
  )
}

export default ProductFilter