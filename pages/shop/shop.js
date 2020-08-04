Page({
  //初始数据
  data: {
    activeId: 1,
    toView: 'a0',
    carlist: [],
    summoney: 0,
    show_cart: false,
    // kindlist:[]
  },
 
  onLoad: function(options) {
     // 连接云平台
    var that = this;
    const db = wx.cloud.database({
      env:'youli-lihaonan'
    });
    db.collection('kindlist').get({
      success: res => {
        console.log('取数据成功,', res.data)
        kindlist = res.data;
        console.log(kindlist);
        that.setData({
          kindlist:kindlist
        })
      }
    });
    console.log(db.collection('kindlist').get());
    console.log(db.collection('kindlist'));
    var kindlist = wx.getStorage({
      key: 'a',
    });
    console.log(kindlist)

  },
  // 左侧菜单选中事件
  selectType(e) {
    console.log(e)
    var x = e.currentTarget.dataset.id
    this.setData({
      activeId: x,
      toView: 'a' + (x - 1),
    })
    console.log(this.data.activeId)
    console.log(this.data.toView)
  },
  // 加入购物车
  add_to_car(e) {
    // console.log(e)
    var type = e.currentTarget.dataset.type
    var index = e.currentTarget.dataset.index
    this.setData({
      current_type: type,
      current_index: index,
    })
    var a = this.data
    var add_item = {
      "name": a.kindlist[a.current_type].foodlist[a.current_index].name,
      "price": a.kindlist[a.current_type].foodlist[a.current_index].price,
      "number": 1,
      "sum": a.kindlist[a.current_type].foodlist[a.current_index].price,
    }
    var summoney = a.summoney + a.kindlist[a.current_type].foodlist[a.current_index].price;
    var carlist = this.data.carlist;
    carlist.push(add_item);
    this.setData({
      carlist: carlist,
      summoney: summoney,
    });
    console.log(carlist);
    console.log(add_item);
    console.log(summoney);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    })
  },
  // 底部购物车的显示/隐藏
  show_cartlist: function() {
    console.log(this.data.show_cart)

    this.setData({
      show_cart: !this.data.show_cart,
    })

  },
  // 清空购物车
  clear_list: function() {
    this.setData({
      carlist: [],
      summoney: 0,
      show_cart: false
    })
  },
  addNumber: function(e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var carlist = this.data.carlist;
    carlist[index].number++;
    var sum = this.data.summoney + carlist[index].price;
    carlist[index].sum += carlist[index].price;

    this.setData({
      carlist: carlist,
      summoney: sum,
    });
  },
  decNumber: function(e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var carlist = this.data.carlist;

    var sum = this.data.summoney - carlist[index].price;
    carlist[index].sum -= carlist[index].price;
    carlist[index].number == 1 ? carlist.splice(index, 1) : carlist[index].number--;
    this.setData({
      carlist: carlist,
      summoney: sum,
      show_cart: carlist.length == 0 ? false : true,
    });
  },
  // 跳转支付页面
  goBalance: function() {
    if (this.data.summoney != 0) {
      wx.setStorageSync('carlist', this.data.carlist);
      wx.setStorageSync('summoney', this.data.summoney);
      wx.navigateTo({
        url: '../order/balance/balance'
      })
    }
  },

})