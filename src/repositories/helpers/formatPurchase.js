class CiudadModelRes {
  constructor({ ciudad, _id }) {
    this.ciudad = ciudad
    this.ciudadId = _id
  }
}
class ColoniaModelRes {
  constructor({ colonia, _id }) {
    this.colonia = colonia
    this.coloniaId = _id
  }
}
class EstadoModelRes {
  constructor({ estado, _id }) {
    this.estado = estado
    this.estadoId = _id
  }
}

class DirectionModelRes {
  constructor({ calle, numeroCasa, coloniaId,estadoId, ciudadId, entreCalles, referencia }) {
    this.calle = calle;
    this.numeroCasa = numeroCasa;
    this.colonia = coloniaId? new ColoniaModelRes(coloniaId): undefined;
    this.ciudad = ciudadId? new CiudadModelRes(ciudadId) : undefined;
    this.estado = estadoId? new EstadoModelRes(estadoId) : undefined
    this.entreCalles = entreCalles;
    this.referencia = referencia;
  }
}
class StatusModelRes {
  constructor({ status, _id }) {
    this.status = status
    this.statusId = _id
  }
}

class CustomerModelRes {
  constructor({ id, name, email, phone, date, direction, status, updatedAt }) {
    this.id = id
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.date = date;
    this.direction = new DirectionModelRes(direction);
    this.status = new StatusModelRes(status);
    this.updatedAt = updatedAt
  }
}

class ProductModelRes {
  constructor({ quantity, product, productId }) {
    this.quantity = quantity
    this.product = product
    this.productId = productId
  }
}

class UserModelRes {
  constructor({name,_id}){
    this.name = name
    this.id = _id

  }
}

class PurchaseModelRes {
  constructor({
    id,
    vendedor,
    cobrador,
    saleDate,
    creditPrice,
    cashPrice,
    cashPriceEndDate,
    collectionDate,
    collectionFrequency,
    products,
    payments,
    status,
    updatedAt
  }) {
    this.id = id
    this.cobrador = new UserModelRes(cobrador);
    this.vendedor = new UserModelRes(vendedor);
    this.saleDate = saleDate;
    this.creditPrice = creditPrice;
    this.cashPrice = cashPrice;
    this.cashPriceEndDate = cashPriceEndDate;
    this.collectionDate = collectionDate;
    this.collectionFrequency = collectionFrequency;
    this.products = products;
    this.payments = payments;
    this.status = new StatusModelRes(status);
    this.updatedAt = updatedAt
  }
}

const ProductFormater = (products) => products.map(({ quantity, productId }) => new ProductModelRes({ quantity, product: productId.product, productId: productId._id }))


const formatPurchasesAndCustomer = (purchases = []) => {
  return purchases.map(
    ({
      _id: id,
      customerId: customer,
      vendedorId: vendedor,
      cobradorId: cobrador,
      saleDate,
      creditPrice,
      cashPrice,
      cashPriceEndDate,
      collectionDate,
      collectionFrequency,
      products,
      payments,
      statusId: status,
      updatedAt
    }) => {
      const newCustomer = {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        date: customer.date,
        direction: {
          calle: customer.direction.calle,
          numeroCasa: customer.direction.numeroCasa,
          coloniaId: customer.direction.coloniaId,
          ciudadId: customer.direction.ciudadId,
          estadoId: customer.direction.estadoId,
          entreCalles: customer.direction.calle,
          referencia: customer.direction.referencia,
        },
        status: customer.statusId,
        updatedAt: customer.updatedAt
      };
      const newPurchase = {
        id,
        vendedor: vendedor,
        cobrador: cobrador,
        saleDate,
        creditPrice,
        cashPrice,
        cashPriceEndDate,
        collectionDate,
        collectionFrequency,
        products: ProductFormater(products),
        payments,
        status: status,
        updatedAt
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
      vendedorId: vendedor,
      saleDate,
      creditPrice,
      cashPrice,
      cashPriceEndDate,
      collectionDate,
      collectionFrequency,
      products,
      payments,
      statusId: status,
      updatedAt
    }) => {

      const newPurchase = {
        id,
        vendedor: vendedor,
        cobrador: cobrador,
        saleDate,
        creditPrice,
        cashPrice,
        cashPriceEndDate,
        collectionDate,
        collectionFrequency,
        products: ProductFormater(products),
        payments,
        status: status,
        updatedAt
      };
      return new PurchaseModelRes(newPurchase)
    }
  );
};

const formatCustomerFromPurchase = (purchases = []) => {
  return purchases.map(
    ({
      customerId: customer,
    }) => {
      const newCustomer = {
        id: customer._id,
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
        updatedAt: customer.updatedAt
      };
      return new CustomerModelRes(newCustomer)
    }
  );
};

const cleanPurchasesWithoutCustomer = (purchases = []) =>
  purchases.filter((purchase) => purchase.customerId);

export { cleanPurchasesWithoutCustomer, formatPurchases, formatPurchasesAndCustomer, formatCustomerFromPurchase };
