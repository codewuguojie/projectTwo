import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import First from '@/components/home/first'
import Login from '@/components/user/login'
import Register from '@/components/user/register'
import Reset from '@/components/user/reset'
import Clause from '@/components/user/clause'
import Agreement from '@/components/user/agreement'
import RexRule from '@/components/user/rexRule'
import Altercode from '@/components/user/altercode'
import Mycenter from '@/components/my/mycenter'
import Download from '@/components/base/header/download'
import Address from '@/components/base/address/address'
import Detailfa from '@/components/detail/detail_fa'
import Detailzc from '@/components/detail/detail_zc'
import Tpos from '@/components/detail/tpos'
import User from '@/components/my/user'
import Set from '@/components/my/set'
import Us from '@/components/my/us'
import Help from '@/components/my/help'
import Opinion from '@/components/my/opinion'
import Setphone from '@/components/my/setphone'
import Setemail from '@/components/my/setemail'
import Collect from '@/components/my/collect'
import Order from '@/components/my/order'
import Logistic from '@/components/my/logistic'
import Location from '@/components/my/location'
import OrderDetail from '@/components/my/orderDetail'
import Reback from '@/components/shopping/reback'
import Check from '@/components/shopping/check'
import Pay from '@/components/shopping/pay'
import Add from '@/components/my/address'
import ContactUs from '@/components/my/contactUs'
import Sucess from '@/components/shopping/sucess'
import Invite from '@/components/invite/invite'
import Invited from '@/components/invite/invited'
import Activity from '@/components/invite/activity'
import Turnplate from '@/components/invite/turnplate'
import SignIn from '@/components/signIn/signIn'
import Nickname from '@/components/user/nickname'
import Attest from '@/components/attest/attest'
import TurnTable from '@/components/turnTable/turnTable'
import ProductList from '@/components/productList/productList'
/*测试*/
import AddressPicker from '@/components/test/addressPicker'
import UploadPic from '@/components/test/uploadPic'
import Youpin from '@/components/other/youpin'
import Video from '@/components/other/video'

import Detail from '@/components/home/detail'
import Test2 from '@/components/home/test2'
import EditAddress from '@/components/my/editAddress'
import Account from '@/components/purchase/account'
import Present from '@/components/purchase/present'
import Confirm from '@/components/purchase/confirm'
import Result from '@/components/purchase/result'
import Three from '@/components/purchase/three'
import Transferout from '@/components/purchase/transferout'
import Transucess from '@/components/purchase/transucess'
import Recall from '@/components/purchase/recall'
import Recallsucess from '@/components/purchase/recallsucess'
import AuthName from '@/components/purchase/authName'

/*
* 大转盘测试页面
* */
import MyTest from '@/components/turnTable/test'


Vue.use(Router)

export default new Router({
    mode:"history", //去除#
	routes: [

	    /*大转盘测试路径*/
        {
            path: '/mytest',
            name: 'mytest',
            component: MyTest
        },
        {
            path: '/rexRule',
            name: 'rexRule',
            component: RexRule
        },

		{
			path: '/home',
			name: 'home',
			component: Home
		},
        {
            path: '/first',
            name: 'first',
            component: First
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/agreement',
            name: 'agreement',
            component: Agreement
        },
        {
            path: '/clause',
            name: 'clause',
            component: Clause
        },
        {
            path: '/reset',
            name: 'reset',
            component: Reset
        },
        {
            path: '/mycenter',
            name: 'mycenter',
            component: Mycenter
        },
        {
            path: '/download',
            name: 'download',
            component: Download
        },
        {
            path: '/detailfa/:id',
            name: 'detailfa',
            component: Detailfa
        },
        {
            path: '/orderDetail/:id',
            name: 'orderDetail',
            component: OrderDetail
        },
        {
            path: '/tpos',
            name: 'tpos',
            component: Tpos
        },
        {
            path: '/user',
            name: 'user',
            component: User
        },
        {
            path: '/set',
            name: 'set',
            component: Set
        },
        {
            path: '/us',
            name: 'us',
            component: Us
        },
        {
            path: '/help',
            name: 'help',
            component: Help
        },
        {
            path: '/opinion',
            name: 'opinion',
            component: Opinion
        },
        {
            path: '/setphone',
            name: 'setphone',
            component: Setphone
        },
        {
            path: '/setemail',
            name: 'setemail',
            component: Setemail
        },
        {
            path: '/collect',
            name: 'collect',
            component: Collect
        },
        {
            path: '/order',
            name: 'order',
            component: Order
        },
        {
            path: '/location',
            name: 'location',
            component: Location
        },
        {
            path: '/altercode',
            name: 'altercode',
            component: Altercode
        },
        {
            path: '/detailzc/:id',
            name: 'detailzc',
            component: Detailzc
        },
        {
            path: '/reback/:id',
            name: 'reback',
            component:  Reback
        },
        {
            path: '/address',
            name: 'address',
            component:  Address
        },
        {
            path: '/check/:id',
            name: 'check',
            component:  Check
        },
        {
            path: '/pay/:id',
            name: 'pay',
            component:  Pay
        },
        {
            path: '/add',
            name: 'add',
            component:  Add
        },
        {
            path: '/invite',
            name: 'invite',
            component:  Invite
        },
        {
            path: '/invited',
            name: 'invited',
            component:  Invited
        },
        {
            path: '/activity',
            name: 'activity',
            component:  Activity
        },
        {
            path: '/turnplate',
            name: 'turnplate',
            component:  Turnplate
        },
        {
            path: '/contactUs',
            name: 'contactUs',
            component: ContactUs
        },
        {
            path: '/signIn',
            name: 'signIn',
            component: SignIn
        },
        {
            path: '/nickname',
            name: 'nickname',
            component: Nickname
        },
        {
            path: '/attest',
            name: 'attest',
            component: Attest
        },
        {
            path: '/turnTable',
            name: 'turnTable',
            component: TurnTable
        },
        {
            path: '/productList',
            name: 'productList',
            component: ProductList
        },
        /*测试组件路径*/
        {
            path:'/addressPicker',
            name:'addressPicker',
            component:AddressPicker
        },
        {
            path:'/uploadPic',
            name:'uploadPic',
            component:UploadPic
        },
        {
            path:'/youpin',
            name:'youpin',
            component:Youpin
        },
        {

            path:'/detail',
            name:'detail',
            component:Detail
        },
        {
            path:'/test2',
            name:'test2',
            component:Test2
        },
        {
            path:'/video',
            name:'video',
            component:Video
        },
        {
            path: '/editAddress',
            name: 'editAddress',
            component:  EditAddress
        },
        {
            path: '/success',
            name: 'success',
            component:  Sucess
        },
        {
            path: '/logistic',
            name: 'logistic',
            component:  Logistic
        },
        {
            path: '/account',
            name: 'account',
            component:  Account
        },
        {
            path: '/present',
            name: 'present',
            component:  Present
        },
        {
            path: '/confirm',
            name: 'confirm',
            component:  Confirm
        },
        {
            path: '/result',
            name: 'result',
            component:  Result
        },
        {
            path: '/three',
            name: 'three',
            component:  Three
        },
        {
            path: '/transferout',
            name: 'transferout',
            component:  Transferout
        },
        {
            path: '/transucess',
            name: 'transucess',
            component:  Transucess
        },
        {
            path: '/recall',
            name: 'recall',
            component:  Recall
        },
        {
            path: '/recallsucess',
            name: 'recallsucess',
            component:  Recallsucess
        },
        {
            path: '/authName',
            name: 'authName',
            component:  AuthName
        },



		{ path: '*', redirect: { name: "first" } }
	]
})
