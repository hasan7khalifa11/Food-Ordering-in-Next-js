-- AlterTable
CREATE SEQUENCE category_order_seq;
ALTER TABLE "Category" ALTER COLUMN "order" SET DEFAULT nextval('category_order_seq');
ALTER SEQUENCE category_order_seq OWNED BY "Category"."order";

-- AlterTable
CREATE SEQUENCE product_order_seq;
ALTER TABLE "Product" ALTER COLUMN "order" SET DEFAULT nextval('product_order_seq');
ALTER SEQUENCE product_order_seq OWNED BY "Product"."order";
