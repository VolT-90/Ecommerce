import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductType } from "@/types/Product.type";
import Image from "next/image";
import Link from "next/link";
import AddBtn from "../AddBtn/AddBtn";

export default function SinglePost({ product } : {product : ProductType}  ) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 p-3">
      <Card className="gap-3 cursor-pointer p-2 transform transition duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
        <Link href={`/products/${product.id}`}>
          <CardHeader>
            <CardTitle>
              <Image src={product.imageCover} alt="" width={500} height={500} />
            </CardTitle>
            <CardDescription className="text-center">
              {product.category.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-green-500 text-center line-clamp-1">
              {product.title}
            </p>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between">
              <span>{product.price} EGP</span>
              <span>
                {product.ratingsAverage}{" "}
                <i className="fas fa-star text-yellow-500"></i>
              </span>
            </div>
          </CardFooter>
        </Link>
        <AddBtn id = {product.id}/>
      </Card>
    </div>
  );
}
