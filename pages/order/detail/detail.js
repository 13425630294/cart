// pages/order/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carlist: [],
    summoney: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单'
    })
    this.setData({
      carlist: wx.getStorageSync('carlist'),
      summoney: wx.getStorageSync('summoney'),
    })
  }

})