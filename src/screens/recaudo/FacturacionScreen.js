import React from 'react'

function FacturacionScreen() {
  return (
    <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card mb-4">
            <div className="card-header p-3 pb-0">
              <div className="d-flex justify-content-between align-items-center">
                <div className="w-50">
                  <h6>Order Details</h6>
                  <p className="text-sm mb-0">
                    Order no. <b>241342</b> from <b>23.02.2021</b>
                  </p>
                  <p className="text-sm">
                    Code: <b>KF332</b>
                  </p>
                </div>
                <a href="https:" className="btn bg-gradient-dark ms-auto mb-0">Invoice</a>
              </div>
            </div>
            <div className="card-body p-3 pt-0">
              <hr className="horizontal dark mt-0 mb-4" />
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <div className="d-flex">
                    <div>
                      <img src="../../../assets/img/product-12.jpg" className="avatar avatar-xxl me-3" alt="product image" />
                    </div>
                    <div>
                      <h6 className="text-lg mb-0 mt-2">Dandelion Print Shirt</h6>
                      <p className="text-sm mb-3">Order was delivered 2 days ago.</p>
                      <span className="badge badge-sm bg-gradient-success">Delivered</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12 my-auto text-end">
                  <a href="https:" className="btn bg-gradient-dark btn-sm mb-0">Contact Us</a>
                  <p className="text-sm mt-2 mb-0">Do you like the product? Leave us a review <a href="https:">here</a>.</p>
                </div>
              </div>
              <hr className="horizontal dark mt-4 mb-4" />
              <div className="row">
                <div className="col-lg-3 col-md-6 col-12">
                  <h6 className="mb-3">Track order</h6>
                  <div className="timeline timeline-one-side">
                    <div className="timeline-block mb-3">
                      <span className="timeline-step">
                        <i className="material-icons text-secondary text-lg">notifications</i>
                      </span>
                      <div className="timeline-content">
                        <h6 className="text-dark text-sm font-weight-bold mb-0">Order received</h6>
                        <p className="text-secondary font-weight-normal text-xs mt-1 mb-0">22 DEC 7:20 AM</p>
                      </div>
                    </div>
                    <div className="timeline-block mb-3">
                      <span className="timeline-step">
                        <i className="material-icons text-secondary text-lg">code</i>
                      </span>
                      <div className="timeline-content">
                        <h6 className="text-dark text-sm font-weight-bold mb-0">Generate order id #1832412</h6>
                        <p className="text-secondary font-weight-normal text-xs mt-1 mb-0">22 DEC 7:21 AM</p>
                      </div>
                    </div>
                    <div className="timeline-block mb-3">
                      <span className="timeline-step">
                        <i className="material-icons text-secondary text-lg">shopping_cart</i>
                      </span>
                      <div className="timeline-content">
                        <h6 className="text-dark text-sm font-weight-bold mb-0">Order transmited to courier</h6>
                        <p className="text-secondary font-weight-normal text-xs mt-1 mb-0">22 DEC 8:10 AM</p>
                      </div>
                    </div>
                    <div className="timeline-block mb-3">
                      <span className="timeline-step">
                        <i className="material-icons text-success text-gradient text-lg">done</i>
                      </span>
                      <div className="timeline-content">
                        <h6 className="text-dark text-sm font-weight-bold mb-0">Order delivered</h6>
                        <p className="text-secondary font-weight-normal text-xs mt-1 mb-0">22 DEC 4:54 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-6 col-12">
                  <h6 className="mb-3">Payment details</h6>
                  <div className="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                    <img className="w-10 me-3 mb-0" src="../../../assets/img/logos/mastercard.png" alt="logo" />
                    <h6 className="mb-0">****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;7852</h6>
                    <button type="button" className="btn btn-icon-only btn-rounded btn-outline-secondary mb-0 ms-2 btn-sm d-flex align-items-center justify-content-center ms-auto" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="We do not store card details">
                      <i className="material-icons text-sm" aria-hidden="true">priority_high</i>
                    </button>
                  </div>
                  <h6 className="mb-3 mt-4">Billing Information</h6>
                  <ul className="list-group">
                    <li className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                      <div className="d-flex flex-column">
                        <h6 className="mb-3 text-sm">Oliver Liam</h6>
                        <span className="mb-2 text-xs">Company Name: <span className="text-dark font-weight-bold ms-2">Viking Burrito</span></span>
                        <span className="mb-2 text-xs">Email Address: <span className="text-dark ms-2 font-weight-bold">oliver@burrito.com</span></span>
                        <span className="text-xs">VAT Number: <span className="text-dark ms-2 font-weight-bold">FRB1235476</span></span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-12 ms-auto">
                  <h6 className="mb-3">Order Summary</h6>
                  <div className="d-flex justify-content-between">
                    <span className="mb-2 text-sm">
                      Product Price:
                    </span>
                    <span className="text-dark font-weight-bold ms-2">$90</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="mb-2 text-sm">
                      Delivery:
                    </span>
                    <span className="text-dark ms-2 font-weight-bold">$14</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-sm">
                      Taxes:
                    </span>
                    <span className="text-dark ms-2 font-weight-bold">$1.95</span>
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <span className="mb-2 text-lg">
                      Total:
                    </span>
                    <span className="text-dark text-lg ms-2 font-weight-bold">$105.95</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default FacturacionScreen