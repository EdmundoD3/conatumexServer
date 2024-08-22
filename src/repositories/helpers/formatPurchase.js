class CiudadModelRes {
  constructor({ciudad,_id}){
    this.ciudad = ciudad
    this.ciudadId = _id
  }
}
class ColoniaModelRes {
  constructor({colonia,_id}){
    this.colonia = colonia
    this.coloniaId = _id
  }
}

class DirectionModelRes {
  constructor({ calle, numeroCasa, coloniaId, ciudadId, entreCalles, referencia }) {
    this.calle = calle;
    this.numeroCasa = numeroCasa;
    this.colonia = new ColoniaModelRes(coloniaId);
    this.ciudad = new CiudadModelRes(ciudadId);
    this.entreCalles = entreCalles;
    this.referencia = referencia;
  }
}
class StatusModelRes {
  constructor({status,_id}){
    this.status = status
    this.statusId = _id
  }
}

class CustomerModelRes {
  constructor({ name, email, phone, date, direction, status }) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.date = date;
    this.direction = new DirectionModelRes(direction);
    this.status = new StatusModelRes(status);
  }
}

class ProductModelRes {
  constructor({quantity, product, productId}){
    this.quantity =quantity
    this.product = product
    this.productId = productId
  }
}


const ProductFormater = (products) => products.map(({quantity,productId})=>new ProductModelRes({quantity,product:productId.product,productId:productId._id}))

class PurchaseModelRes {
  constructor({
    vendedor,
    saleDate,
    creditPrice,
    cashPrice,
    cashPriceEndDate,
    collectionDate,
    collectionFrequency,
    products,
    payments,
    status,
  }) {
    this.vendedor = vendedor;
    this.saleDate = saleDate;
    this.creditPrice = creditPrice;
    this.cashPrice = cashPrice;
    this.cashPriceEndDate = cashPriceEndDate;
    this.collectionDate = collectionDate;
    this.collectionFrequency = collectionFrequency;
    this.products = products;
    this.payments = payments;
    this.status = new StatusModelRes(status);
  }
}

const formatPurchasesAndCustomer = (purchases = []) => {
  return purchases.map(
    ({
      customerId:customer,
      vendedorId:vendedor,
      saleDate,
      creditPrice,
      cashPrice,
      cashPriceEndDate,
      collectionDate,
      collectionFrequency,
      products,
      payments,
      statusId:status,
    }) => {
      const newCustomer = {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        date: customer.date,
        direction: {
          calle: customer.direction.calle,
          numeroCasa: customer.direction.numeroCasa,
          coloniaId: customer.direction.coloniaId,
          ciudadId: customer.direction.ciudadId,
          entreCalles: customer.direction.calle,
          referencia: customer.direction.referencia,
        },
        status: customer.statusId,
      };
      const newPurchase = {
        vendedor: vendedor.name,
        saleDate,
        creditPrice,
        cashPrice,
        cashPriceEndDate,
        collectionDate,
        collectionFrequency,
        products:ProductFormater(products),
        payments,
        status: status,
      };

      const res = {
        customer: new CustomerModelRes(newCustomer),
        purchase: new PurchaseModelRes(newPurchase),
      };
      return res;
    }
  );
};

const formatPurchases = (purchases = []) => {
  return purchases.map(
    ({
      vendedorId:vendedor,
      saleDate,
      creditPrice,
      cashPrice,
      cashPriceEndDate,
      collectionDate,
      collectionFrequency,
      products,
      payments,
      statusId:status,
    }) => {

      const newPurchase = {
        vendedor: vendedor.name,
        saleDate,
        creditPrice,
        cashPrice,
        cashPriceEndDate,
        collectionDate,
        collectionFrequency,
        products:ProductFormater(products),
        payments,
        status: status.status,
      };
        return  new PurchaseModelRes(newPurchase)
    }
  );
};

const formatCustomerFromPurchase = (purchases = []) => {
  return purchases.map(
    ({
      customerId:customer,
    }) => {
      const newCustomer = {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        date: customer.date,
        direction: {
          calle: customer.direction.calle,
          numeroCasa: customer.direction.numeroCasa,
          coloniaId: customer.direction.coloniaId,
          ciudadId: customer.direction.ciudadId,
          entreCalles: customer.direction.calle,
          referencia: customer.direction.referencia,
        },
        status: customer.statusId,
      };
      return new CustomerModelRes(newCustomer)
    }
  );
};

const cleanPurchasesWithoutCustomer = (purchases = []) =>
  purchases.filter((purchase) => purchase.customerId);

export { cleanPurchasesWithoutCustomer, formatPurchases, formatPurchasesAndCustomer, formatCustomerFromPurchase };
