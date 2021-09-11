import React, { Component } from "react";
import { connect } from "react-redux";
import "./about.css";
import customer from "../../service/customer";
class About extends Component {
  renderCustomerList = () => {
    const listCustomer = this.props.customer;
    console.log("CEK PRODUCT ===>", listCustomer);
    return listCustomer.map((customer, idx) => {
      console.log("CEK PRODUCT RENDER ===>", customer);
      return (
        <div key={idx} className="konten">
          <div>
            <p className="title">Tagihan Pajak Bumi dan Bangunan</p>
          </div>
          <div className="">
            <p>
              {idx + 1}. Nama : {customer.nama}
            </p>
            <p>Nomor NOP : {customer.nop}</p>
            <p>Jenis Pajak : {customer.jenis}</p>
            <p>Alamat Tinggal : {customer.alamat}</p>
            <p>Alamat Objek Pajak : {customer.objek}</p>
            <p>Tahun Pembayaran : {customer.tahun}</p>
            <p>Estimasi Pembayaran : {customer.estimasi}</p>
            <p>Jatuh Tempo : {customer.tempo}</p>
            <hr />
            <div>
              <p>Rincian Tagihan</p>
              <p>Keterlamabatan : {customer.telat}</p>
              <p>Jumlah Tagihan : {this.convertRp(customer.tagihan)}</p>
              <p>
                Biaya Keterlambatan : {this.convertRp(customer.keterlambatan)}
              </p>
              <p>Biaya Admin : {this.convertRp(customer.admin)}</p>
              <p>
                Total Tagihan :{" "}
                {this.convertRp(
                  customer.tagihan + customer.keterlambatan + customer.admin
                )}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };
  convertRp = (e) => {
    const format = e.toString().split("").reverse().join(""); //diformat ke dalam string
    const convert = format.match(/\d{1,3}/g); //ambil 3 angka
    const rupiah =
      "Rp " + convert.join(".").split("").reverse().join("") + ",00"; //join hasil format dan ambil 3 angka
    return rupiah;
  };
  render() {
    return (
      <div className="">
        <p>{this.renderCustomerList()}</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isLogedIn: state.Auth,
  customer: state.Customer.listCustomer,
});
export default connect(mapStateToProps)(About);
