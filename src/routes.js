import LazyLoad from "./common/LazyLoad";
import * as MenuGroup from "./common/MenuGroup";

const NotFound = LazyLoad(() =>
  import('./common/CommonComponents/Error/NotFound')
)

const AccessDenied = LazyLoad(() =>
  import('./common/CommonComponents/Error/AccessDenied')
);

const RolesList = LazyLoad(() =>
  import('./modules/Roles/List/RolesList')
);

const ActionHistoryList = LazyLoad(() =>
  import('./modules/ActionHistory/List/ActionHistoryList')
);
const ConfigurationList = LazyLoad(() =>
  import('./modules/Configuration/List/ConfigurationList')
);
const Category = LazyLoad(() =>
  import('./modules/Category/List/CategoryList')
);
const UsersList = LazyLoad(() =>
  import('./modules/Users/List/UsersList')
);
const PaymentHistory = LazyLoad(() =>
  import('./modules/PaymentHistory/List/PaymentHistoryList')
);
const PaymentInfo = LazyLoad(() =>
  import('./modules/PaymentInfo/PaymentInfo')
);
const SiteInfo = LazyLoad(() =>
  import('./modules/SiteInfo/SiteInfo')
);
const FacebookToken = LazyLoad(() =>
  import('./modules/FacebookToken/List/FacebookTokenList')
);
const Home = LazyLoad(() =>
  import('./modules/Home/Home')
);
const ForgotPassword = LazyLoad(() =>
  import('./common/Login/ForgotPassword')
);
const Register = LazyLoad(() =>
  import('./common/Login/Register')
);
const FacebookBuffPost = LazyLoad(() =>
  import('./modules/FacebookBuff/BuffPost')
)
const FacebookBuffFanpage = LazyLoad(() =>
  import('./modules/FacebookBuff/BuffFanpage')
)
const FacebookBuffProfile = LazyLoad(() =>
  import('./modules/FacebookBuff/BuffProfile')
)
const InstagramBuffLike = LazyLoad(() =>
  import('./modules/InstagramBuff/InstagramBuffLike')
)
const InstagramBuffSub = LazyLoad(() =>
  import('./modules/InstagramBuff/InstagramBuffSub')
)
const InstagramBuffComment = LazyLoad(() =>
  import('./modules/InstagramBuff/InstagramBuffComment')
)
const FacebookVipLike = LazyLoad(() =>
  import('./modules/FacebookVip/FacebookVipLike')
)
const FacebookVipComment = LazyLoad(() =>
  import('./modules/FacebookVip/FacebookVipComment')
)
const Profile = LazyLoad(() =>
  import('./modules/Profile/Profile')
)
const Login = LazyLoad(() =>
  import('./common/Login/LoginNew')
)
const FacebookVipShare = LazyLoad(() =>
  import('./modules/FacebookVip/FacebookVipShare')
)
const AllRequests = LazyLoad(() =>
  import('./modules/AllRequests/List/AllRequestsList')
)
const MyRequests = LazyLoad(() =>
  import('./modules/MyRequests/MyRequests')
)
const routes = [
  { path: '/', exact: true, render: MyRequests },
  { path: '/ForgotPassword', render: ForgotPassword },
  { path: '/Register', render: Register },
  { path: '/Admin/RolesList', render: RolesList },
  { path: '/Admin/ActionHistory', render: ActionHistoryList },
  { path: '/Admin/Configuration', render: ConfigurationList },
  { path: '/Admin/Category', render: Category },
  { path: '/Admin/PaymentHistory', render: PaymentHistory },
  { path: '/Admin/Users', render: UsersList , groupName: MenuGroup.AdminMenu},
  { path: '/Admin/SiteInfo', render: SiteInfo, groupName: MenuGroup.AdminMenu },
  { path: '/Admin/FacebookToken', render: FacebookToken , groupName: MenuGroup.AdminMenu},
  { path: '/NotFound', exact: true, render: NotFound },
  { path: '/AccessDenied', exact: true, render: AccessDenied },
  { path: '/order-seeding-post', exact: true, render: FacebookBuffPost },
  { path: '/order-seeding-sub', exact: true, render: FacebookBuffProfile },
  { path: '/order-seeding-like-fanpage', exact: true, render: FacebookBuffFanpage },
  { path: '/order-instagram-like', exact: true, render: InstagramBuffLike },
  { path: '/order-instagram-sub', exact: true, render: InstagramBuffSub },
  { path: '/order-instagram-comment', exact: true, render: InstagramBuffComment },
  { path: '/vip-like-order', exact: true, render: FacebookVipLike },
  { path: '/vip-comment-order', exact: true, render: FacebookVipComment },
  { path: '/vip-share-order', exact: true, render: FacebookVipShare },
  { path: '/profile', exact: true, render: Profile },
  { path: '/paymentInfo', exact: true, render: PaymentInfo },  
  { path: '/Admin/AllRequests', exact: true, render: AllRequests, groupName: MenuGroup.AdminMenu },  
  { path: '/login', exact: true, render: Login },
  { path: '*', exact: true, render: NotFound },
]
export default routes