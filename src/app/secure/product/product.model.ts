export class Product {
  id: string;
  productTile: string;
  description: string;
  sku: string;
  shippingInfo: string;

  constructor(
    id: string = '',
    productTile: string = '',
    description: string = '',
    sku: string = '',
    shippingInfo: string = '') {
    this.productTile = productTile;
    this.description = description;
    this.sku = sku;
    this.shippingInfo = shippingInfo;
  }
}