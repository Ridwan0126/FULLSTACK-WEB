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
          <div className="cont">
            <div className="bk">
              <p className="txt1">Nama</p>
            </div>
            <p className="tst2">{customer.nama}</p>
            <div className="bk">
              <p className="txt1">Nomor NOP</p>
            </div>
            <p className="tst2">{customer.nop}</p>
            <div className="bk">
              <p className="txt1">Jenis Pajak</p>
            </div>
            <p className="tst2">{customer.jenis}</p>
            <div className="bk">
              <p className="txt1">Alamat Tinggal</p>
            </div>
            <p className="tst2">{customer.alamat}</p>
            <div className="bk">
              <p className="txt1">Alamat Objek Pajak</p>
            </div>
            <p className="tst2">{customer.objek}</p>
            <div className="bk">
              <p className="txt1">Tahun Pembayaran</p>
            </div>
            <p className="tst2">{customer.tahun}</p>
            <div className="bk">
              <p className="txt1">Estimasi Pembayaran</p>
            </div>
            <p className="tst2">{customer.estimasi}</p>
            <div className="bk">
              <p className="txt1">Jatuh Tempo</p>
            </div>
            <p className="tst2">{customer.tempo}</p>
            <hr style={{ marginLeft: 10, marginRight: 10 }} />
            <div className="tagihan">
              <p className="titless">Rincian Tagihan</p>
              <div>
                <p className="titles">Keterlamabatan</p>
              </div>
              <div>
                <p className="subTitles">{customer.telat}</p>
              </div>
              <div>
                <p className="titles">Jumlah Tagihan</p>
              </div>
              <div>
                <p className="subTitles">{this.convertRp(customer.tagihan)}</p>
              </div>
              <div>
                <p className="titles">Biaya Keterlambatan</p>
              </div>
              <div>
                <p className="subTitles">
                  {this.convertRp(customer.keterlambatan)}
                </p>
              </div>
              <div>
                <p className="titles">Biaya Admin</p>
              </div>
              <div>
                <p className="subTitles">{this.convertRp(customer.admin)}</p>
              </div>
              <div>
                <p className="titles">Total Tagihan</p>
              </div>
              <div>
                <p className="subTitles">
                  {this.convertRp(
                    customer.tagihan + customer.keterlambatan + customer.admin
                  )}
                </p>
              </div>
              <br />
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
