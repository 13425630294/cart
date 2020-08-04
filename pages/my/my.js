// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    avatarUrl: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(that);
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var userInfo = res.userInfo
        that.setData({
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
        })
      }
    })
  },

  bitphone: function () {
    wx.makePhoneCall({
      phoneNumber: '1008611'
    })
  }
})