/* eslint-disable */

import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import { Helmet } from 'react-helmet-async';

import ImageGallery from 'react-image-gallery';
import ReactHlsPlayer from 'react-hls-player';

import "react-image-gallery/styles/css/image-gallery.css";
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

// eslint-disable-next-line
// import "swiper/css/bundle";
import "../swiper.css";

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const images = [
  {
    original: 'https://dgtzuqphqg23d.cloudfront.net/Q9d4pwyMDx8DbhHOWxhztdHNsyXvAQDAuotdhgquzLc-2048x1536.jpg',
    thumbnail: 'https://dgtzuqphqg23d.cloudfront.net/Q9d4pwyMDx8DbhHOWxhztdHNsyXvAQDAuotdhgquzLc-2048x1536.jpg',
  },
  // {
  //   original: 'https://stream.mux.com/z00q2X8tJ01OjRbJKG73DxpA4cBi2Usv01kz2qBIQuMLx4.m3u8',
  //   thumbnail: 'https://image.mux.com/z00q2X8tJ01OjRbJKG73DxpA4cBi2Usv01kz2qBIQuMLx4/thumbnail.jpg?width=3000&height=1687&fit_mode=preserve&time=0'
  // },
  {
    original: 'https://dgtzuqphqg23d.cloudfront.net/vLiaAnLgxVeorhrasgcBS9v8YcZfTWDwTamNx8mIK4o-2048x1536.jpg',
    thumbnail: 'https://dgtzuqphqg23d.cloudfront.net/vLiaAnLgxVeorhrasgcBS9v8YcZfTWDwTamNx8mIK4o-2048x1536.jpg'
  }
]
const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ContactIcons from '../components/Contact/ContactIcons';

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activity: null,
    };

    this.getThumbs = this.getThumbs.bind(this);
    this.getMedia = this.getMedia.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        activity: {'id': 7267705625, 'name': 'Day 4: Tamarac to Port St. Lucie', 'description': "Started the day early and got in 50 miles by 10am, 20 of which were with Max's father. Took a nap before heading into REI to return a shirt and exchange some socks.\n\nDecided to try out their bike shop to see what can be done about my hub. Took it apart and cleaned it, and it got much, much worse. Put it in the ultrasonic cleaner and lubed it up, and it's rideable again. Should still probably replace the freehub body.\n\nGot a haircut right after, then I headed to McDonald's. Tailwind the whole day meant I could get some extra miles in.\n\nWent through Jonathan Dickinson park and had to squeeze myself through a gate to get out.\n\nWaited out a storm at a gas station. Got soaked due to horizontal rain. A couple fire stations wouldn't let me sleep nearby, so I set up my sleeping pad at a civic center. ", 'distance': 151332.0, 'moving_time': '6:45:48', 'elapsed_time': '17:00:39', 'start_latlng': '[27.29678708128631, -80.29859516769648]', 'end_latlng': '[27.29678708128631, -80.29859516769648]', 'polyline': 'sy__D|f_iNCa@Mc@y@{@Ya@[Ko@Im@o@Ea@C?CF@PF@BC?y@Bo@e@SOCc@C{CCkAM_Co@}BgA{A}@aD}A{@e@OQ?Mf@eBNaABWFuBKgBMy@_D_QMqBA_OA_BIiAOI]g@m@OaACyNLqD?}EB_BFiE^kDv@YEMQWuBIY_@cCa@kBi@_DIm@DMMQM_@Y}AQmBSwDGkBGaE?_Dl@yU@{BCyFIsBMwAWkB_@oBg@iBM_@ESDc@HOKK[QKM{@}C]wBOiBC}BN}N?mBQaCa@oBUk@_AkBq@{@q@k@wBoAYUeA[}@[wAq@uBy@gGiC_Bk@sA]_BWuAKqBGmLGaCKsAMqAOuDo@oEoAmFuBeJyDeAk@wAcAyEyDeBiA_B{@sAm@kGgCwHeDi@SYS_@Q[AQGmCkAyCgAiAWeBWqAGwQDoGDcVHkBBgBCmAQy@W{@]sA_@}@MeAEIECGAIDwEFiT@s@BOCk@BwJNkWEeBIsAu@}EWuBIsACmB@kFIoBQaBoE_SSaBIkACqAAeBH{QFgE@QP]?GCEC?KNIBS?e@Uk@E{FEoA@eECUA{@Wu@i@c@o@IUIUKq@?kAXaE@YQCKI@[KM_Ae@}H_CaBk@_B{@iAeAeA{Ak@}AOg@]y@Ie@Gs@Bk@?[@GLKDIBMA?C^AA@QDEACABALIFu@Lm@@y]Nab@LmAA{HDeBBqBFgG`@_BFwEF_FBcKA{EK}COqDIwCCg`@FmEFkd@`AsEHiYXin@`@aN\\qGDsEBsGAwG?yQLot@ReHFuZDkCAqFFuF@wp@HgDB{@B{BAkdBb@ih@HgJCqEBiKHkPFu[HuBDeNBsBA{LFmHH_MDuf@\\_^HuQLub@J{d@ZqeANkKA{k@@eg@LcL@}{Ad@wk@Xix@Xg_B`@wMFmOBwVJwV@y@Aa@E?ACDIB_@B{IB_QPuz@TedATm[JkO@wHBuIAsIDqfALu~@H_D?gJK_HMa@GCIQLK@{HGgj@s@yLKmYa@cd@i@eLWs@GuKO_@EkA@qCGwUW{[g@mBE}@IwCEUICYBcLOae@Iwb@Ao@CIEEOCgA@cDAyE@qABsCCO@AJ]@C@Kb@I@CSUa@WKQAiCEcBIoCWkAQyA]}Aa@kBo@sB_AcBaAkBoAyAoAyAyAyMyNuAsAuAmAwAcAwA}@aBy@kBw@yBq@gBa@oB]iBSqBMeBCkSFUC[?u@BgE@{NT{SDiSHoBC{@Eo@HmGFuKAoNHePD{AAoBMsCYiBMSDCDFHRNDHH?DMCMQ[G_@F]Fu@?mFEcH@sVCy@GUQQICICm@A{F?wFBmIHgBAoD@M?KES[S?u@NK?}y@TwC?_BG{C]cAUSKMo@ME_APUAqLsCqBSsBAsWHcBOsA[aBm@}A_AaB}AyA_BqAqAUQWQgAm@qBo@qBYwBCkF@wI?U?MGEOAQDcDDqIZc^R{MRm\\?]S{CAgBG_B@_CB_AD_@?_@KYSQYIiA?oABaGXkB@{K[qGWcIQuHSm]iAmBSkB]uBq@kB{@iAu@yAoAw@{@{@mAgAmBu@sBsIgZcF}PiAoCy@_Bw@mAiA{AkAqA_BwAgBmAiAm@cBu@qAc@aBa@oB]{AM}@CyCAu@IS[E]JkGXo]@yBKeDOuCCwB@aDDiGJwFFaRBg@BeBDaFDsA?iCHcIH{DBcEFeOFmEAo@Gg@MGkAGiGQqn@cAqSWsHMm]iAeN_@mBK}GWKIMCW?cABmGWgBEgMe@{FOwHO{FE_BIcRYiIQ]@}JUi]e@cQ[gUYwg@w@u[]s@CmA?cg@c@}HKwKIO@a@Gc@CwNEcXa@{PYOAIKC_@G?Gd@SDySYyKS{EMyXa@qFOEAYSM?c@Pk@?}FIeFC_HG}HMyBMcBA_@DOAEA?GDBAD_@Eq@BmBCkHC{DBqEAqBCmBE{AOiEAQKESB{GCgBM{AOkAIi@c@kBs@_Ce@uBoBwOY_Am@_EU]OGO?kCZa@?eCLECIMEyBIk@KSSQWGI@EB?@KKA?vCwERp@aA|A?RDV@TGjAS|BQPe@FaHR_EDiF@kGCct@aAW?]Lq@F{BAa@F[PIJIVUdKKPQBg@?EECQJaA@?Ix@QN?JHF`@FbASTSFa@IyAAe@Bu@DQBe@BuBIg@KSOMQGUAsEGoBA{i@q@yk@k@aJI}CCgAIyCAoHGsy@aAuLSsKMaOK{eCoCaZg@{UWqEAeDIsEEIKASb@kUT}YAmAByBAaJEoAMkAGuBI]IOQGS?eGlCYFMGEUSs@Qa@CSDI`@O`@A@@@FGF}@vD}G`DqGrCkBl@oBd@}Dj@yT~AiFXwBPuIh@qCN_CJuGN_MImGI}l@kBe@?qBDgCXk`@bJc_@`J{dAjVqEnAyWnIgV|HeJrC_JvCaPbFsMfEo@Ti@`@e@PqE|AIFKT@ZXrALlAGPKDy@LCH?JP\\BBN@b@GD@HJ?hBQtBDPLL`@NpEf@zA@ZPrB|@\\VXZ`@r@Rd@F^t@~BfAzC^pAx@`EPbAB\\WNgDfAoBh@qBp@qA^gA`@sBl@uBr@}KhD{@ZcFzA{J`D[FyJ|CcCr@sGvBiBf@[LgGnBmDbAqPjFSEIQGqDb@iF\\{BJUBMAMCE?EBIHC@C_@Lq@A_AHo@JG?KKAMPmAB}@?cCEw@@aBFYDAZ@ZN^Hj@TVBJ?JIT_@Ru@V_BH_@Rc@NITGg@NS`@QjAYlA_@|@]L{Bq@[CGJIjAFrC?~BATOv@BXTLvASdACLCNKdAaBpA}A\\w@h@}BRmACUGCDPEn@u@`D]t@m@t@cBhCSLSDq@?aBVUEEG@YLi@BY@cBIcEBmATeABg@IqAOiAYw@KKQGUBWD{Ab@s@Z]T_A|@aAdA_Ar@gBlA_@\\s@x@SHWGeBiB{@e@mAi@UO[Y_@m@ISIe@Ok@EEI]IMSEu@LstA|XaEv@aB^yAb@_Bp@kAj@kBjA}AlAaB`BiAtA_AvAo@hAwTdc@ie@f~@iAhBaAjAgBlBuAhA{B|AqAn@eBt@gQ|FcA^eJvCMCUUc@CGQJL`@FBBBPCLgFdB_Cz@aM~D}UbIyQ`GeCz@aEpAmi@lQcA`@_DrAcBz@}Az@qBpAiBlA}qAl~@eDbCyAjA{AtAmOrO__@r_@}F~F{HbIgBbBiIpIqL`MmDdD}CnDmCrDqCzE_CvE_FlKaCnFoFdLsb@n~@_Ql_@kIhQsA`CkAhBmDxEwBbCiCdCsC~B{DnCeDjBsVvMqYvOiVlMsJhFwH|D[R{JjFy@^K@GGEUWk@A?MD@FABE?@NI?@@CCIm@CBCA@LHV?DGJGBMSEAi@JQTEV?RPp@?RINWPuYpOm@X}PjJsSxKOF_PxIgKpFgDrBaBfAyAhA}CjCaDbDc@f@sCjCcO~Ni@d@Y\\gAbAkPjPsUlUsHjHeFfFqAnAaBlBcAjBm@rAkV`p@_AxAqAlAsAp@wA^yAJgXI{DPmC`@aGxAqE|@uB^sFz@gGp@aCRyJj@eEZaGn@iDd@eBXkCf@sDt@qD|@eG`Bc@DQKCSAS@GHGb@QPADEACQCDBIHHDDJEB[DBBFCI?OKSDCDIlAGFgKxCwY~HoRpFa@H}N`E_KjCgTbGiD~@kATkLzC}MxD_O|DuGjBaKnC_ATqC|@}Ah@uAt@mDtBuEtCyKpGgYxPgB`Au@f@aNdI}CjBuBlAwDpBcWbMwCvA{@^q@^wBdAeP|H{HzDOBEAEEK[EAELGf@ENMLAH?v@H`BCdI@jDAxEGVED_@BoBEAF~B@VBDL@PDBDEFe@H[LcABoKGiBEoEIUWWSIIAu@H{Ap@yq@p\\yFlC_MjGuS|J}O~HkJnEcAj@_A^_AVaC\\{Ar@O@IEwA{DgAiCyCkIEs@Ig@]WaGEiG[mA?w@Ge@DYXa@Js@?[CKEGBBLb@@VJHTV?NGNSB?HDB`@JpDJdA@vAJX^Rp@BfB@xBAj@QfB{@XGJJbAnCB@BC?Ec@_Ai@wAc@g@OUCAED', 'summary_polyline': 'sy__D|f_iNQeAsA}AkAUs@qAEXNkBaIm@_Co@gM{Gv@uDJmCyDaVQqUIiAm@q@y^AuM~Ag@WgEkVe@eHOmMl@yUKiNe@cE{AmGNs@s@k@yAuGSgFAmVw@{CqBgDcEqCmWwJuDc@uVi@wMoCsQoH}PoL{VuK_LuDwD_@_x@TeLaC\\gcAgBaRKiMaFaV]mDBsWZ_GcCMqOGgCcAcAmCZgHgB}A_LkDiDaC_D{GQyAZsBC^B]qBh@emA`@wW|@gh@g@g`@Fmq@rAg`B~AauJvBcxGxCctD^moPfFuzD`@ayFaIYc@[wwAaUGiAv@q@aAoKi@oJaC}KaH_VuV}JsFqIqBaIe@srCdA}Mq@\\h@MwAJyi@KoA[Uqc@FaAa@wcA\\_Fs@o@aAuANcPgDk^GsGiCcHaHqEoBqBY_VIfAe{A]{SwB[}L^ufAcDoIcBoGaE{DwFmRyo@cCoFaCiDkDiDuGqDcHcBsHSiAe@`@sj@]uQtAiaBW_BmwAcCo~AkF}}@_BqyFaH{PY]m@c@j@iaA}A_He@axAaAW_@?cK]gDgCkKwDwWu@e@sHh@_@wDuAq@vCwERp@aA|ASjGw@XkUZo|@eAeGZo@t@UdKkANHsA[hAj@ZbAS\\u@DcJU{@w@WqqL{Ml@iq@?iP[qGSm@e@G_HtC}@gChA[aAhEoPtHyK~By{@`FmUS}l@kB_H^kfCpl@k^~KclAt_@{InDIp@f@`DqAn@Tl@bAFKpF|IfAfEbCzEfNnAbH{vBbq@]WGqDzAuLuETNwLL[rDj@jAuEx@u@{@p@kAvE}D[SlLXf@zDg@tDwF|@kEKY?`AsAvEqC~DqEd@H{MXmBY{Cw@kA{E~AqKfJyHkFsAwD]Sk|Ab[gJ`DiExCkFnGq|@vdBkCtD}DvDsHbEq^tLoAo@p@X?^{}Bxv@}KvGy|ArgAyaBhcBkHbJqGrLqqAjrC_DjFeH|IyMtKyoBpeAeA`@e@iA[b@Uo@Bv@[Q{@`@JpBa@`@m_Bd{@cJdGuaBv`BqB~DkV`p@qCfDeG|Ac^Fk]tGuj@bFa[|GWs@fAi@SGJ^gAHQtAovDbdAeI|CqtArx@c~@zc@m@a@c@|ADdZM\\qCDvCDLb@f@aEKsSiAy@__C`iA}IhCYCyHqSO{A]WqSi@aBj@cBEhAp@dAU\\pJj@l@rGBlDuAvAxCmA}C}@y@', 'media': [{'id': '07f46667-8142-4105-91fe-d16cd1e6d563', 'activity_id': 7267705625, 'is_video': false, 'video_url': null, 'small_image_url': 'https://dgtzuqphqg23d.cloudfront.net/BHV_MDtyCbloGh6eD25xl-15eeX608LAhu8ARg_8AgY-128x33.jpg', 'large_image_url': 'https://dgtzuqphqg23d.cloudfront.net/BHV_MDtyCbloGh6eD25xl-15eeX608LAhu8ARg_8AgY-2048x536.jpg', 'location': '[27.018126, -80.111338]'}, {'id': '176281c8-9891-491d-897a-61f808e8567b', 'activity_id': 7267705625, 'is_video': true, 'video_url': 'https://stream.mux.com/cxchvHrDb601wZeT7xRcPjFR8LHQd7PbYCKbu4woBPhU.m3u8', 'small_image_url': 'https://image.mux.com/cxchvHrDb601wZeT7xRcPjFR8LHQd7PbYCKbu4woBPhU/thumbnail.jpg?width=100&height=56&fit_mode=preserve&time=0', 'large_image_url': 'https://image.mux.com/cxchvHrDb601wZeT7xRcPjFR8LHQd7PbYCKbu4woBPhU/thumbnail.jpg?width=3000&height=1687&fit_mode=preserve&time=0', 'location': '[27.1545, -80.2191]'}, {'id': '1f8d1d2d-b864-49bb-8515-fae35a872edd', 'activity_id': 7267705625, 'is_video': false, 'video_url': null, 'small_image_url': 'https://dgtzuqphqg23d.cloudfront.net/e70P-hTH6Nu6LfjkeW4qDgY7_ggBc3qQWHdZ-BH8AjE-128x96.jpg', 'large_image_url': 'https://dgtzuqphqg23d.cloudfront.net/e70P-hTH6Nu6LfjkeW4qDgY7_ggBc3qQWHdZ-BH8AjE-2048x1536.jpg', 'location': '[27.018154, -80.111217]'}, {'id': '60020156-381b-488a-9c42-7ce2a2e32ef6', 'activity_id': 7267705625, 'is_video': false, 'video_url': null, 'small_image_url': 'https://dgtzuqphqg23d.cloudfront.net/HdPPcBZIpUtK11YS3vGULmIHEAbM2TjO39Q4c9T3tHE-128x96.jpg', 'large_image_url': 'https://dgtzuqphqg23d.cloudfront.net/HdPPcBZIpUtK11YS3vGULmIHEAbM2TjO39Q4c9T3tHE-2048x1536.jpg', 'location': '[27.018152, -80.111368]'}, {'id': '7253db99-902a-4514-acfe-f4750abbde09', 'activity_id': 7267705625, 'is_video': false, 'video_url': null, 'small_image_url': 'https://dgtzuqphqg23d.cloudfront.net/AsVSPQo8cwjbW-AXft8U8eYotC1iV8dpTV-RJf--qww-128x96.jpg', 'large_image_url': 'https://dgtzuqphqg23d.cloudfront.net/AsVSPQo8cwjbW-AXft8U8eYotC1iV8dpTV-RJf--qww-2048x1536.jpg', 'location': '[27.018154, -80.111217]'}, {'id': '7d57b361-a704-448c-9e2b-2e257d069d27', 'activity_id': 7267705625, 'is_video': true, 'video_url': 'https://stream.mux.com/z00q2X8tJ01OjRbJKG73DxpA4cBi2Usv01kz2qBIQuMLx4.m3u8', 'small_image_url': 'https://image.mux.com/z00q2X8tJ01OjRbJKG73DxpA4cBi2Usv01kz2qBIQuMLx4/thumbnail.jpg?width=100&height=56&fit_mode=preserve&time=0', 'large_image_url': 'https://image.mux.com/z00q2X8tJ01OjRbJKG73DxpA4cBi2Usv01kz2qBIQuMLx4/thumbnail.jpg?width=3000&height=1687&fit_mode=preserve&time=0', 'location': '[27.0181, -80.1111]'}, {'id': '80d95cab-3e58-4308-be5f-956f733b901d', 'activity_id': 7267705625, 'is_video': false, 'video_url': null, 'small_image_url': 'https://dgtzuqphqg23d.cloudfront.net/KVwAlym3OkmhqMOIG-GaLEcE0TqyFvNJjqr8bMO_5ts-128x96.jpg', 'large_image_url': 'https://dgtzuqphqg23d.cloudfront.net/KVwAlym3OkmhqMOIG-GaLEcE0TqyFvNJjqr8bMO_5ts-2048x1536.jpg', 'location': '[26.281933, -80.201693]'}, {'id': '881080a1-e835-4cd3-9601-fc3ecddb781d', 'activity_id': 7267705625, 'is_video': false, 'video_url': null, 'small_image_url': 'https://dgtzuqphqg23d.cloudfront.net/rSVQa-wCZgpQzMdnscOJaA67t1E0htAHpw63CH34CI4-128x96.jpg', 'large_image_url': 'https://dgtzuqphqg23d.cloudfront.net/rSVQa-wCZgpQzMdnscOJaA67t1E0htAHpw63CH34CI4-2048x1536.jpg', 'location': '[27.018154, -80.111217]'}, {'id': '956d86fe-799b-421f-8836-fa5c83ef9139', 'activity_id': 7267705625, 'is_video': false, 'video_url': null, 'small_image_url': 'https://dgtzuqphqg23d.cloudfront.net/vLiaAnLgxVeorhrasgcBS9v8YcZfTWDwTamNx8mIK4o-128x96.jpg', 'large_image_url': 'https://dgtzuqphqg23d.cloudfront.net/vLiaAnLgxVeorhrasgcBS9v8YcZfTWDwTamNx8mIK4o-2048x1536.jpg', 'location': '[26.929887, -80.08094]'}, {'id': '9c48386c-a76d-4418-b582-361a010eb56f', 'activity_id': 7267705625, 'is_video': false, 'video_url': null, 'small_image_url': 'https://dgtzuqphqg23d.cloudfront.net/xqkQUWQMTRrtlcWBPj3pq9IKL638X5pjUzpyOuD3f5A-128x96.jpg', 'large_image_url': 'https://dgtzuqphqg23d.cloudfront.net/xqkQUWQMTRrtlcWBPj3pq9IKL638X5pjUzpyOuD3f5A-2048x1536.jpg', 'location': '[26.849569, -80.094511]'}, {'id': 'a035665f-2a26-4cea-8cfa-91dc9701a5b3', 'activity_id': 7267705625, 'is_video': false, 'video_url': null, 'small_image_url': 'https://dgtzuqphqg23d.cloudfront.net/6Do-g7yB18nMfmOqo_8LAvaFO9lomz5Om1JGvmbuMY8-128x96.jpg', 'large_image_url': 'https://dgtzuqphqg23d.cloudfront.net/6Do-g7yB18nMfmOqo_8LAvaFO9lomz5Om1JGvmbuMY8-2048x1536.jpg', 'location': '[27.018154, -80.111217]'}, {'id': 'bd2fd474-849e-4f46-aa8a-0be835dce70f', 'activity_id': 7267705625, 'is_video': false, 'video_url': null, 'small_image_url': 'https://dgtzuqphqg23d.cloudfront.net/dENt4tHRe2wp1hkE-4bQb5ES5yeXxuThWZwhk1vf_io-128x96.jpg', 'large_image_url': 'https://dgtzuqphqg23d.cloudfront.net/dENt4tHRe2wp1hkE-4bQb5ES5yeXxuThWZwhk1vf_io-2048x1536.jpg', 'location': '[26.272408, -80.221143]'}, {'id': 'e885194c-f79e-415d-9a4b-ee8ecf62d67c', 'activity_id': 7267705625, 'is_video': false, 'video_url': null, 'small_image_url': 'https://dgtzuqphqg23d.cloudfront.net/Q9d4pwyMDx8DbhHOWxhztdHNsyXvAQDAuotdhgquzLc-128x96.jpg', 'large_image_url': 'https://dgtzuqphqg23d.cloudfront.net/Q9d4pwyMDx8DbhHOWxhztdHNsyXvAQDAuotdhgquzLc-2048x1536.jpg', 'location': '[27.017516, -80.109291]'}]}
      }
    )
  }

  getThumbs() {
    return this.state.activity.media.map((mediaDict) => {
        if (mediaDict.is_video) {
          return (
            <div>
              <img alt="" src={mediaDict.small_image_url}/>
            </div>
          )
        }
      }
    ).concat(
      this.state.activity.media.map((mediaDict) => {
          if (!mediaDict.is_video) {
            return (
              <div>
                <img alt="" src={mediaDict.small_image_url}/>
              </div>
            )
          }
        }
      )
    ).filter(x => x !== undefined);
    // return [
    //   <div>
    //     <img alt="" src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"/>
    //   </div>,
    //   <div>
    //     <img alt="" src="https://swiperjs.com/demos/images/nature-2.jpg"/>
    //   </div>,
    //   <div>
    //     <img alt="" src="https://swiperjs.com/demos/images/nature-2.jpg"/>
    //   </div>,
    //   <div>
    //     <img alt="" src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"/>
    //   </div>,
    //   <div>
    //     <img alt="" src="https://swiperjs.com/demos/images/nature-2.jpg"/>
    //   </div>,
    //   <div>
    //     <img alt="" src="https://swiperjs.com/demos/images/nature-2.jpg"/>
    //   </div>,
    //   <div>
    //     <img alt="" src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"/>
    //   </div>,
    //   <div>
    //     <img alt="" src="https://swiperjs.com/demos/images/nature-2.jpg"/>
    //   </div>,
    //   <div>
    //     <img alt="" src="https://swiperjs.com/demos/images/nature-2.jpg"/>
    //   </div>,
    // ]
  }

  getMedia() {
    var list = this.state.activity.media.map((mediaDict) => {
        if (mediaDict.is_video) {
          return (
            <div>
              <ReactHlsPlayer
                src={mediaDict.video_url}
                autoPlay={false}
                controls={true}
                width="100%"
                height="auto"
              />
            </div>
          )
        }
      }
    ).concat(
      this.state.activity.media.map((mediaDict) => {
        if (!mediaDict.is_video) {
          return (
            <div>
              <img alt="" src={mediaDict.large_image_url}/>
            </div>
          )
        }
      }
    )).filter(x => x !== undefined);

    return list

    //   return (
    //     this.state.activity.med
    //
    //     this.state.activity.media.map((mediaDict) =>
    //       {mediaDict.is_video &&
    //       <div>
    //         <ReactHlsPlayer
    //           src={mediaDict.video_url}
    //           autoPlay={false}
    //           controls={true}
    //           width="100%"
    //           height="auto"
    //         />
    //       </div>}
    //     ) +
    //     this.state.activity.media.map((mediaDict) =>
    //       <div>
    //         <img alt="" src={mediaDict.large_image_url}/>
    //       </div>
    //     )
    //   );
    // }
  }

  render() {
    return (
      <Main
        title='Blog'
      >
        <Helmet>
          <script src='https://strava-embeds.com/embed.js'></script>
        </Helmet>
        <article className="post" id="blog">
          <header>
            <div className="title">
              <h2 data-testid="heading"><Link to="/blog">Blog</Link></h2>
            </div>
          </header>
          {this.state.activity &&
            <>
              <h3 data-testid="heading">{this.state.activity.name}</h3>
              <div>
                <Carousel
                  dynamicHeight={true}
                  renderThumbs={this.getThumbs}
                  infiniteLoop={true}
                  showArrows={false}
                  showStatus={false}
                >
                  {this.getMedia()}
                  {/*<div>*/}
                  {/*  <img alt="" src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"/>*/}
                  {/*</div>*/}
                  {/*<div>*/}
                  {/*  <img alt="" src="https://swiperjs.com/demos/images/nature-2.jpg"/>*/}
                  {/*</div>*/}
                  {/*<div>*/}
                  {/*  <ReactHlsPlayer*/}
                  {/*    src='https://stream.mux.com/z00q2X8tJ01OjRbJKG73DxpA4cBi2Usv01kz2qBIQuMLx4.m3u8'*/}
                  {/*    autoPlay={false}*/}
                  {/*    controls={true}*/}
                  {/*    width="100%"*/}
                  {/*    height="auto"*/}
                  {/*    className="hls"*/}
                  {/*  />*/}
                  {/*</div>*/}
                  {/*<div>*/}
                  {/*  <img alt="" src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"/>*/}
                  {/*</div>*/}
                  {/*<div>*/}
                  {/*  <img alt="" src="https://swiperjs.com/demos/images/nature-2.jpg"/>*/}
                  {/*</div>*/}
                  {/*<div>*/}
                  {/*  <ReactHlsPlayer*/}
                  {/*    src='https://stream.mux.com/z00q2X8tJ01OjRbJKG73DxpA4cBi2Usv01kz2qBIQuMLx4.m3u8'*/}
                  {/*    autoPlay={false}*/}
                  {/*    controls={true}*/}
                  {/*    width="100%"*/}
                  {/*    height="auto"*/}
                  {/*  />*/}
                  {/*</div>*/}
                  {/*<div>*/}
                  {/*  <img alt="" src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"/>*/}
                  {/*</div>*/}
                  {/*<div>*/}
                  {/*  <img alt="" src="https://swiperjs.com/demos/images/nature-2.jpg"/>*/}
                  {/*</div>*/}
                  {/*<div>*/}
                  {/*  <ReactHlsPlayer*/}
                  {/*    src='https://stream.mux.com/z00q2X8tJ01OjRbJKG73DxpA4cBi2Usv01kz2qBIQuMLx4.m3u8'*/}
                  {/*    autoPlay={false}*/}
                  {/*    controls={true}*/}
                  {/*    width="100%"*/}
                  {/*    height="auto"*/}
                  {/*  />*/}
                  {/*</div>*/}
                </Carousel>
              </div>
              <p>{this.state.activity.description}</p>
              <div
                className="strava-embed-placeholder"
                data-embed-type="activity"
                data-embed-id={this.state.activity.id}
              />
            </>
          }
          <ContactIcons />
        </article>
      </Main>
    );
  }
}
// class Blog extends React.Component {
//   constructor() {
//     super();
//     // const [thumbsSwiper, setThumbsSwiper] = useState(null);
//     this.state = {
//       thumbsSwiper: null,
//       showIndex: false,
//       showBullets: true,
//       infinite: true,
//       showThumbnails: true,
//       showFullscreenButton: true,
//       showGalleryFullscreenButton: true,
//       showPlayButton: true,
//       showGalleryPlayButton: true,
//       showNav: true,
//       isRTL: false,
//       slideDuration: 450,
//       slideInterval: 2000,
//       slideOnThumbnailOver: false,
//       thumbnailPosition: 'bottom',
//       showVideo: {},
//       useWindowKeyDown: true,
//     };
//
//     this.images = [
//       {
//         thumbnail: `${PREFIX_URL}4v.jpg`,
//         original: `${PREFIX_URL}4v.jpg`,
//         embedUrl: 'https://stream.mux.com/z00q2X8tJ01OjRbJKG73DxpA4cBi2Usv01kz2qBIQuMLx4.m3u8',
//         description: 'Render custom slides (such as videos)',
//         renderItem: this._renderVideo.bind(this)
//       },
//       {
//         original: `${PREFIX_URL}1.jpg`,
//         thumbnail: `${PREFIX_URL}1t.jpg`,
//         originalClass: 'featured-slide',
//         thumbnailClass: 'featured-thumb',
//         description: 'Custom class for slides & thumbnails',
//       },
//     ].concat(this._getStaticImages());
//   }
//
//   _onImageClick(event) {
//     console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
//   }
//
//   _onImageLoad(event) {
//     console.debug('loaded image', event.target.src);
//   }
//
//   _onSlide(index) {
//     this._resetVideo();
//     console.debug('slid to index', index);
//   }
//
//   _onPause(index) {
//     console.debug('paused on index', index);
//   }
//
//   _onScreenChange(fullScreenElement) {
//     console.debug('isFullScreen?', !!fullScreenElement);
//   }
//
//   _onPlay(index) {
//     console.debug('playing from index', index);
//   }
//
//   _handleInputChange(state, event) {
//     if (event.target.value > 0) {
//       this.setState({[state]: event.target.value});
//     }
//   }
//
//   _handleCheckboxChange(state, event) {
//     this.setState({[state]: event.target.checked});
//   }
//
//   _handleThumbnailPositionChange(event) {
//     this.setState({thumbnailPosition: event.target.value});
//   }
//
//   _getStaticImages() {
//     let images = [];
//     for (let i = 2; i < 12; i++) {
//       images.push({
//         original: `${PREFIX_URL}${i}.jpg`,
//         thumbnail:`${PREFIX_URL}${i}t.jpg`
//       });
//     }
//
//     return images;
//   }
//
//   _resetVideo() {
//     this.setState({showVideo: {}});
//
//     if (this.state.showPlayButton) {
//       this.setState({showGalleryPlayButton: true});
//     }
//
//     if (this.state.showFullscreenButton) {
//       this.setState({showGalleryFullscreenButton: true});
//     }
//   }
//
//   _toggleShowVideo(url) {
//     this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
//     this.setState({
//       showVideo: this.state.showVideo
//     });
//
//     if (this.state.showVideo[url]) {
//       if (this.state.showPlayButton) {
//         this.setState({showGalleryPlayButton: false});
//       }
//
//       if (this.state.showFullscreenButton) {
//         this.setState({showGalleryFullscreenButton: false});
//       }
//     }
//   }
//
//   _renderVideo(item) {
//     return (
//       <div>
//         {
//           this.state.showVideo[item.embedUrl] ?
//             <div className='video-wrapper'>
//               <a
//                 className='close-video'
//                 onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
//               >
//               </a>
//               <ReactHlsPlayer
//                 src={item.embedUrl}
//                 autoPlay={false}
//                 controls={true}
//                 width="100%"
//                 height="auto"
//               />,
//               {/*<video width="560" height="315" controls>*/}
//               {/*  <source src={item.embedUrl} type="application/x-mpegURL" />*/}
//               {/*</video>*/}
//               {/*<iframe*/}
//               {/*  width='560'*/}
//               {/*  height='315'*/}
//               {/*  src={item.embedUrl}*/}
//               {/*  frameBorder='0'*/}
//               {/*  allowFullScreen*/}
//               {/*>*/}
//               {/*</iframe>*/}
//             </div>
//             :
//             <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
//               <div className='play-button'></div>
//               <img className='image-gallery-image' src={item.original} />
//               {
//                 item.description &&
//                 <span
//                   className='image-gallery-description'
//                   style={{right: '0', left: 'initial'}}
//                 >
//                     {item.description}
//                   </span>
//               }
//             </a>
//         }
//       </div>
//     );
//   }
//
//   render() {
//     return (
//       <Main
//         title="Blog"
//         // description="Ian Randman's Resume. Arthena, Matroid, YC, Skeptical Investments, Stanford ICME, Planet Labs, and Facebook."
//       >
//         <header>
//           <div className="title">
//             <h2 data-testid="heading"><Link to="/blog">Blog</Link></h2>
//           </div>
//         </header>
//         <Helmet>
//           <script src='https://strava-embeds.com/embed.js'></script>
//         </Helmet>
//         <Swiper
//           style={{
//             "--swiper-navigation-color": "#fff",
//             "--swiper-pagination-color": "#fff",
//           }}
//           spaceBetween={10}
//           navigation={true}
//           thumbs={{ swiper: this.state.thumbsSwiper }}
//           modules={[FreeMode, Navigation, Thumbs]}
//           className="mySwiper2"
//         >
//           <SwiperSlide>
//             <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
//           </SwiperSlide>
//           <SwiperSlide>
//             <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
//           </SwiperSlide>
//         </Swiper>
//         {/*<ReactHlsPlayer*/}
//         {/*  src='https://stream.mux.com/z00q2X8tJ01OjRbJKG73DxpA4cBi2Usv01kz2qBIQuMLx4.m3u8'*/}
//         {/*  autoPlay={false}*/}
//         {/*  controls={true}*/}
//         {/*  width="100%"*/}
//         {/*  height="auto"*/}
//         {/*/>*/}
//         {/*Hello*/}
//         {/*<ImageGallery*/}
//         {/*  // ref={i => this._imageGallery = i}*/}
//         {/*  items={this.images}*/}
//         {/*  // onClick={this._onImageClick.bind(this)}*/}
//         {/*  // onImageLoad={this._onImageLoad}*/}
//         {/*  // onSlide={this._onSlide.bind(this)}*/}
//         {/*  // onPause={this._onPause.bind(this)}*/}
//         {/*  // onScreenChange={this._onScreenChange.bind(this)}*/}
//         {/*  // onPlay={this._onPlay.bind(this)}*/}
//         {/*  // infinite={this.state.infinite}*/}
//         {/*  // showBullets={this.state.showBullets}*/}
//         {/*  // showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}*/}
//         {/*  // showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}*/}
//         {/*  // showThumbnails={this.state.showThumbnails}*/}
//         {/*  // showIndex={this.state.showIndex}*/}
//         {/*  // showNav={this.state.showNav}*/}
//         {/*  // isRTL={this.state.isRTL}*/}
//         {/*  // thumbnailPosition={this.state.thumbnailPosition}*/}
//         {/*  // slideDuration={parseInt(this.state.slideDuration)}*/}
//         {/*  // slideInterval={parseInt(this.state.slideInterval)}*/}
//         {/*  // slideOnThumbnailOver={this.state.slideOnThumbnailOver}*/}
//         {/*  // additionalClass="app-image-gallery"*/}
//         {/*  // useWindowKeyDown={this.state.useWindowKeyDown}*/}
//         {/*/>*/}
//         {/*<div className='strava-embed-placeholder' data-embed-type='activity'*/}
//         {/*     data-embed-id='7282971555'></div>*/}
//       </Main>
//     );
//   }
//
// }

// function Blog() {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//
//   return (
//     <>
//       <Swiper
//         style={{
//           "--swiper-navigation-color": "#fff",
//           "--swiper-pagination-color": "#fff",
//         }}
//         spaceBetween={10}
//         navigation={true}
//         thumbs={{ swiper: thumbsSwiper }}
//         modules={[FreeMode, Navigation, Thumbs]}
//         className="mySwiper2"
//       >
//         <SwiperSlide>
//           <img src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
//         </SwiperSlide>
//         {/*<SwiperSlide>*/}
//         {/*  <img src="https://swiperjs.com/demos/images/nature-3.jpg" />*/}
//         {/*</SwiperSlide>*/}
//         {/*<SwiperSlide>*/}
//         {/*  <img src="https://swiperjs.com/demos/images/nature-4.jpg" />*/}
//         {/*</SwiperSlide>*/}
//         {/*<SwiperSlide>*/}
//         {/*  <img src="https://swiperjs.com/demos/images/nature-5.jpg" />*/}
//         {/*</SwiperSlide>*/}
//         {/*<SwiperSlide>*/}
//         {/*  <img src="https://swiperjs.com/demos/images/nature-6.jpg" />*/}
//         {/*</SwiperSlide>*/}
//         {/*<SwiperSlide>*/}
//         {/*  <img src="https://swiperjs.com/demos/images/nature-7.jpg" />*/}
//         {/*</SwiperSlide>*/}
//         {/*<SwiperSlide>*/}
//         {/*  <img src="https://swiperjs.com/demos/images/nature-8.jpg" />*/}
//         {/*</SwiperSlide>*/}
//         {/*<SwiperSlide>*/}
//         {/*  <img src="https://swiperjs.com/demos/images/nature-9.jpg" />*/}
//         {/*</SwiperSlide>*/}
//         {/*<SwiperSlide>*/}
//         {/*  <img src="https://swiperjs.com/demos/images/nature-10.jpg" />*/}
//         {/*</SwiperSlide>*/}
//       </Swiper>
//       <Swiper
//         onSwiper={setThumbsSwiper}
//         spaceBetween={10}
//         slidesPerView={4}
//         freeMode={true}
//         watchSlidesProgress={true}
//         modules={[FreeMode, Navigation, Thumbs]}
//         className="mySwiper"
//       >
//         <SwiperSlide>
//           <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
//         </SwiperSlide>
//         {/*<SwiperSlide>*/}
//         {/*  <img src="https://swiperjs.com/demos/images/nature-3.jpg" />*/}
//         {/*</SwiperSlide>*/}
//         {/*<SwiperSlide>*/}
//         {/*  <img src="https://swiperjs.com/demos/images/nature-4.jpg" />*/}
//         {/*</SwiperSlide>*/}
//         {/*<SwiperSlide>*/}
//         {/*  <img src="https://swiperjs.com/demos/images/nature-5.jpg" />*/}
//         {/*</SwiperSlide>*/}
//         {/*<SwiperSlide>*/}
//         {/*  <img src="https://swiperjs.com/demos/images/nature-6.jpg" />*/}
//         {/*</SwiperSlide>*/}
//         {/*<SwiperSlide>*/}
//         {/*  <img src="https://swiperjs.com/demos/images/nature-7.jpg" />*/}
//         {/*</SwiperSlide>*/}
//         {/*<SwiperSlide>*/}
//         {/*  <img src="https://swiperjs.com/demos/images/nature-8.jpg" />*/}
//         {/*</SwiperSlide>*/}
//         {/*<SwiperSlide>*/}
//         {/*  <img src="https://swiperjs.com/demos/images/nature-9.jpg" />*/}
//         {/*</SwiperSlide>*/}
//         {/*<SwiperSlide>*/}
//         {/*  <img src="https://swiperjs.com/demos/images/nature-10.jpg" />*/}
//         {/*</SwiperSlide>*/}
//       </Swiper>
//     </>
//   );
// }

// const Blog = () => (
//   <Main
//     title="Blog"
//     // description="Ian Randman's Resume. Arthena, Matroid, YC, Skeptical Investments, Stanford ICME, Planet Labs, and Facebook."
//   >
//     <header>
//       <div className="title">
//         <h2 data-testid="heading"><Link to="/blog">Blog</Link></h2>
//       </div>
//     </header>
//     <Helmet>
//       <script src='https://strava-embeds.com/embed.js'></script>
//     </Helmet>
//     {/*Hello*/}
//     <ImageGallery items={images} />
//     {/*<div className='strava-embed-placeholder' data-embed-type='activity'*/}
//     {/*     data-embed-id='7282971555'></div>*/}
//   </Main>
// );

export default Blog;
