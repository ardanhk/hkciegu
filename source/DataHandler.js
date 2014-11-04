/**
 * Created by Administrator on 26/5/2014.
 */
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs = require("fs");
mongoose.connect('mongodb://localhost/vCom');
var conn = mongoose.connection;
var gfs = Grid(conn.db, mongoose.mongo);

var AlbumSchema = mongoose.Schema({
    OrgID: String,
    Img: String,
    Caption: String,
    AlbumName: String
});


var SlideImgSchema = mongoose.Schema({
    Img: String,
    Caption: String
});

var ListSchema = mongoose.Schema({
    Title: String,
    Link: String,
    SubList: [ListSchema]
});


var OrgSchema = mongoose.Schema({
    OrgTcName: String,
    OrgScName: String,
    OrgEnName: String,
    OrgSTcName: String,

    OrgID: String,
    AboutUs: String,
    Phone: String,
    Email: String,
    Address: String,
    LogoImg: String,
    IsSubOrg: Boolean,
    OrgGroupID: String,
    SubGroupOrder: Number,

    SlideImg: [SlideImgSchema],
    Service: [ListSchema],
    Purpose: [ListSchema],
    Downloads: [ListSchema]
});


var MsgSchema = mongoose.Schema({
        MSG_ID: String,
        MSG_Subject: String,
        MSG_Description: String,
        MSG_Content: String,
        MSG_File: String,

        MSG_Date: String,
        MSG_IMG: String,
        MSG_VIDEO: String,

        Group_ID: String,
        Category_ID: String,
        District_ID: String
    }
);


var MsgModel = mongoose.model('Msg', MsgSchema);

var OrgModel = mongoose.model('Org', OrgSchema);

var AlbumModel = mongoose.model('Album', AlbumSchema);

var albumList = new Array;


albumList[albumList.length] = new AlbumModel({
    OrgID: "org1",
    Img: "ab1_1.png",
    Caption: "爭取權益",
    AlbumName: "遊行"

});
albumList[albumList.length] = new AlbumModel({
    OrgID: "org1",
    Img: "ab1_2.png",
    Caption: "爭取權益",
    AlbumName: "遊行"

});
albumList[albumList.length] = new AlbumModel({
    OrgID: "org1",
    Img: "ab1_3.png",
    Caption: "爭取權益",
    AlbumName: "四月"

});

albumList[albumList.length] = new AlbumModel({
    OrgID: "org1",
    Img: "ab1_3.png",
    Caption: "爭取權益",
    AlbumName: "四月"

});

albumList[albumList.length] = new AlbumModel({
    OrgID: "org21",
    Img: "CHM_4481.JPG",
    Caption: "爭取權益",
    AlbumName: "活動1"

});

albumList[albumList.length] = new AlbumModel({
    OrgID: "org21",
    Img: "IMG_0967.jpg",
    Caption: "爭取權益",
    AlbumName: "活動2"

});


albumList[albumList.length] = new AlbumModel({
    OrgID: "org21",
    Img: "照片 029-1.jpg",
    Caption: "爭取權益",
    AlbumName: "活動3"

});

var serviceList = mongoose.model('Services', ListSchema);

var orgList = new Array;

removeAll();

orgList[orgList.length] = new OrgModel({OrgID: 'org1', LogoImg: "logo-01.png", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "香港建造業總工會",
    OrgScName: "香港建造業總工會",
    OrgEnName: "香港建造業總工會",
    OrgSTcName: "建總",
    AboutUs: "香港建造業總工會成立於1986年是香港工會聯合會的屬會，是建造行業集團工會。本會凝聚了歷史長短不一、工種不同的屬會23間。當中有成立了一百多年跨越一個世紀歷史悠久的屬會；有會員眾多、傳統優良、享有盛名的屬會；亦有成立不久、潛力待發、方興未艾的屬會。                        工會宗旨是：堅持「愛國、愛港、團結、權益、福利、參與」的精神，爭取勞工權益、調處勞資關係、推廣職業安全與健康、關心工人職業生活、興辦工人福利、開展文娛康樂活動、參與勞工事務和社會事務，促進工人團結。凡從事建造行業，包括地盤、裝修、文職人員、以及與建造行業有關，不論任何工作部門及工程之員工，均可參加工會。 ",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: false,
    SubGroupOrder: "0",
    OrgGroupID: "group1",
    Service: [
        {Title: "工聯會進修中心",
            Link: "",
            SubList: "" },
        {Title: "就業轉介",
            Link: "",
            SubList: "" },
        {Title: "項目計劃",
            Link: "",
            SubList: [
                {Title: "預防石棉沉着病全港社區推廣計劃",
                    Link: "",
                    SubList: "" },
                {Title: "超越「塵世美」社交復康計劃",
                    Link: "",
                    SubList: "" },
                {Title: "肺塵埃沉着病補償基金委員會醫學監測計劃",
                    Link: "",
                    SubList: "" },
                {Title: "「職業性失聰人士社群及職業復康活動計劃」",
                    Link: "",
                    SubList: "" },
                {Title: "建造業午間安全巡迴講座",
                    Link: "",
                    SubList: "" }


            ]


        }
    ],
    Purpose: [
        {Title: "凝聚香港建造業從業員",
            Link: "",
            SubList: "" },
        {Title: "爭取公平和合理的雇傭條件",
            Link: "",
            SubList: "" },
        {Title: "推動行業職業安全健康",
            Link: "",
            SubList: "" },
        {Title: "促進從業員與業界的溝通",
            Link: "",
            SubList: "" }


    ],
    Downloads: [
        {Title: "修改會員資料的表格",
            Link: "",
            SubList: "" },
        {Title: "爭取公平和合理的雇傭條件",
            Link: "",
            SubList: "" }
    ]
})
;


orgList[orgList.length] = new OrgModel({OrgID: 'org2', LogoImg: "Logo.png", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "香港坭水建築業職工會",
    OrgScName: "香港坭水建築業職工會",
    OrgEnName: "香港坭水建築業職工會",
    OrgSTcName: "坭水",

    AboutUs: "香港坭水建築業職工會成立於1874年。工會的宗旨是聯絡香港所有坭水建築業工人，促進互助與團結，爭取及維持合理的工資、工作時數、工作條件以及保障會員應得利益，協調會員和僱主間，會員與會員間或會員與其他工人間的關係，并採取融洽辦法，也調解各方面互生之糾紛。提倡體育及正當娛樂，促進會員身體健康，增進會員文化、技術、社交及政治知識，推廣工業安全與健康及開辦職業技能提升課程，提高會員素質。本會提倡愛國愛港，關心香港的發展，積極參與社會事務，提高工人的社會地位。",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "0",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [



    ],
    Downloads: [

    ]
})
;


orgList[orgList.length] = new OrgModel({OrgID: 'org3', LogoImg: "Logo.png", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "港九木匠總工會",
    OrgScName: "港九木匠總工會",
    OrgEnName: "港九木匠總工會",
    OrgSTcName: "木匠",

    AboutUs: "成立日期：1919年 工會宗旨：本會以團結木匠及裝修工友、發揮互望互助精神，為行業工友爭取合理的工資、權益福利及工作條件，及調解會員與僱主間之糾紛。 本會舉辦多種文娛康樂、職業安全及行業技術交流等活動，促進會員職業及身心健康、提高會員技術及文化。 本會提倡愛國愛港文化，關心香港發展，提高工友地位及維護行業利益。 ",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "1",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;

orgList[orgList.length] = new OrgModel({OrgID: 'org4', LogoImg: "Logo.png", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "港九油漆業總工會",
    OrgScName: "港九油漆業總工會",
    OrgEnName: "港九油漆業總工會",
    OrgSTcName: "油漆",

    AboutUs: "本會是一個廣大業內工友為核心，以發揮高度團結和戶主精神為理想，更以謀求工人應有權益為宗旨的愛國工會組織。 積極爭取和維護全體工友的合理工作時間、工資和僱傭條件、協調勞資關係和處理勞資糾紛為工會日常要務。 舉辦各種文娛康樂、職業安全、技術交流等則為本會的經常活動。 凡從事油漆業和製漆業的工友，年齡在十六歲以上，均歡迎親臨本會辦理入會手續。 ",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "2",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;

orgList[orgList.length] = new OrgModel({OrgID: 'org5', LogoImg: "Logo.png", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "香港喉管從業員總會",
    OrgScName: "香港喉管從業員總會",
    OrgEnName: "Hong Kong Plumbing General Union",
    OrgSTcName: "喉管",

    AboutUs: "本會創會於一九四七年，戰後社會蕭條，工人生活困苦，要維護職業生活，率自發組織結社，名為“港九機科錢銅鐵喉工業研究會”及後社會工業發展日盛，勞資矛盾加劇，將“研究會”提升為職工會，登記成為政府合法社團，舉起團結之旗，致力為水喉工人爭取合理權益福利，經常開展文康活動；行業性材料新產品推介，技術理論交流講座，更成功爭取到為本行業工人每年調整工資談判的協議機制。 入會資格：凡從事於喉管（衛生潔具業、渠務、消防、冷起、及氣液體管道業）從業員，皆可參加本會。以互助互愛，加強團結，保障僱員權益，為促進本行業工藝技術水準，提高專業地位齊做貢獻。 ",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "3",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;


orgList[orgList.length] = new OrgModel({OrgID: 'org6', LogoImg: "Logo.png", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "港九搭棚同敬工會",
    OrgScName: "港九搭棚同敬工會",
    OrgEnName: "Hong Kong and Kowloon Bamboo Scaffolding Workers Union (Tung-King)",
    OrgSTcName: "搭棚",

    AboutUs: "",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "4",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;


orgList[orgList.length] = new OrgModel({OrgID: 'org7', LogoImg: "", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "香港建築模板業職工會",
    OrgScName: "香港建築模板業職工會",
    OrgEnName: "Hong Kong Construction Industry Formwork Workers Union",
    OrgSTcName: "模板",

    AboutUs: "",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "5",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;


orgList[orgList.length] = new OrgModel({OrgID: 'org8', LogoImg: "", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "香港建造業測量、平水及工程管理人員協會",
    OrgScName: "香港建造業測量、平水及工程管理人員協會",
    OrgEnName: "Hong Kong Construction Industry Formwork Workers Union",
    OrgSTcName: "平水",

    AboutUs: "香港建造業測量平水及工程管理人員協會成立於1990年5月20日。是香港建造業總工會其中的一個屬會。現有會員百多人，原名為香港平水工會，建基於當時工地平水繩墨操作員，俗稱墨斗佬，結集統稱成為平水工會至1996年因工程管理人員要求加盟而更易會名。為秉乘眾志集結力量，本會理幹事皆為義工，無怨無悔為會員爭取業界應有權益，傳遞相關訊息，參與課程顧問並協助會員解決欠薪或佐證事項。鞏固及招募會員工作將會為本會壯大能量，除維護基本權益外更參與愛國愛港活動，發揮團結工會精神，貢獻社會。",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "6",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;


orgList[orgList.length] = new OrgModel({OrgID: 'org9', LogoImg: "", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "香港建造業扎鐵職工會",
    OrgScName: "香港建造業扎鐵職工會",
    OrgEnName: "Hong Kong Construction Industry Formwork Workers Union",
    OrgSTcName: "扎鐵",

    AboutUs: "",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "7",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;

orgList[orgList.length] = new OrgModel({OrgID: 'org10', LogoImg: "Logo.png", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "香港建造業機械操作及維修專業人員協會",
    OrgScName: "香港建造業機械操作及維修專業人員協會",
    OrgEnName: "Hong Kong Construction Industry Formwork Workers Union",
    OrgSTcName: "機協",

    AboutUs: "",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "8",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;


orgList[orgList.length] = new OrgModel({OrgID: 'org11', LogoImg: "", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "港九打石建造業職工會",
    OrgScName: "港九打石建造業職工會",
    OrgEnName: "Hong Kong and Kowloon Masonry and Building Workers Union",
    OrgSTcName: "打石",

    AboutUs: "港九打石建造業職工會成立於1958年。是香港建造業總工會的屬會。本會成立的宗旨是團結、凝聚從事建造業打石工作之從業員，爭取及維護從業員的權益，關心社會事務及支持勞工運動。歡迎從事建造業打石的從業員參加本會。",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "9",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;


orgList[orgList.length] = new OrgModel({OrgID: 'org12', LogoImg: "Logo.png", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "港九水泥混凝土工程業職工會",
    OrgScName: "港九水泥混凝土工程業職工會",
    OrgEnName: "Hong Kong and Kowloon Cement and Concrete Construction Trade Workers Union",
    OrgSTcName: "水泥",

    AboutUs: "成立日期：一九五八年。 工會宗旨： 爭取勞工權益，關心工友職業生活，維護本行業之整體權益，並以合理合情合法之公平原則處理勞資關係。 積極參與職業安全健康活動，推動工友關注建造業之職安健常識和法例，提高工友之職安意識。 加強本業員工團結，工會是工人的大家庭，工會力量源於工友之團結，本會提倡愛國愛港立場，積極參與社會事務。 服務對象： 本港建造業工程機有關混凝土和天橋、地基打樁工程施工之員工。 ",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "10",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;


orgList[orgList.length] = new OrgModel({OrgID: 'org13', LogoImg: "", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "港九船塢碼頭做木總會",
    OrgScName: "港九船塢碼頭做木總會",
    OrgEnName: "Hong Kong and Kowloon Dockyards and Wharves Carpenters General Union",
    OrgSTcName: "船塢",

    AboutUs: "",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "11",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;


orgList[orgList.length] = new OrgModel({OrgID: 'org14', LogoImg: "", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "香港剷漆油漆維修業工會",
    OrgScName: "香港剷漆油漆維修業工會",
    OrgEnName: "Hong Kong and Kowloon Dockyards and Wharves Carpenters General Union",
    OrgSTcName: "剷漆",

    AboutUs: "",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "12",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;

orgList[orgList.length] = new OrgModel({OrgID: 'org15', LogoImg: "", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "香港雕刻木器裝修工會",
    OrgScName: "香港雕刻木器裝修工會",
    OrgEnName: "Hong Kong Wood Carving and Decoration Industries Union",
    OrgSTcName: "雕刻",

    AboutUs: "",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "13",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;


orgList[orgList.length] = new OrgModel({OrgID: 'org16', LogoImg: "", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "香港木箱工會",
    OrgScName: "香港木箱工會",
    OrgEnName: "Hong Kong Wood Carving and Decoration Industries Union",
    OrgSTcName: "木箱",

    AboutUs: "",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "14",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;

orgList[orgList.length] = new OrgModel({OrgID: 'org17', LogoImg: "", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "建造業議會員工總會",
    OrgScName: "建造業議會員工總會",
    OrgEnName: "Hong Kong Wood Carving and Decoration Industries Union",
    OrgSTcName: "員總",

    AboutUs: "",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "16",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;

orgList[orgList.length] = new OrgModel({OrgID: 'org18', LogoImg: "Logo.png", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "香港通架專業人員總會",
    OrgScName: "香港通架專業人員總會",
    OrgEnName: "Hong Kong Wood Carving and Decoration Industries Union",
    OrgSTcName: "通架",

    AboutUs: "",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "17",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;


orgList[orgList.length] = new OrgModel({OrgID: 'org19', LogoImg: "", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "香港裝修及屋宇維修從業員協會",
    OrgScName: "香港裝修及屋宇維修從業員協會",
    OrgEnName: "Hong Kong Decoration Trade & Building Maintenance Employees Association",
    OrgSTcName: "裝修",

    AboutUs: "屋宇署於 2010年12月31日 推行註冊小型工程承建商制度，非註冊人士不能承造 126 項指定小型工程。由於註冊制度的實施，成功註冊的小型工程承建商頗多，業內一群熱心人士十分關注從業員的權益及服務水平，自發性地組織了註冊小型工程承建商(個人及獲授權簽署人)僱員協會。本會於2012年1月9日獲勞工處職工會登記局審批成立，現正公開招募會員。本會致力團結業界及從業員、加強會員與政府之間的溝通、維護會員的權益、提高會員對小型工程監管制度的一般指引及技術指引的瞭解和執行；小型工程承建商及獲授權簽署人的責任等。 ",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "18",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;


orgList[orgList.length] = new OrgModel({OrgID: 'org20', LogoImg: "Logo.png", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "香港建造業文職、管理及專業人員協會",
    OrgScName: "香港建造業文職、管理及專業人員協會",
    OrgEnName: "Hong Kong Construction Industry Clerical, Managerial and Professional Employees Association",
    OrgSTcName: "文職",

    AboutUs: "香港建造業文職、管理及專業人員協會成立於2010年8月18日。本會成立的宗旨是團結、凝聚從事建造業文職、管理及專業工作之從業員，爭取及維護從業員的權益，協調業界勞資關係，關注從業員的在職培訓及文康活動，關心社會事務及支持勞工運動。歡迎從事建造業文職、管理及專業人員的從業員參加本會。 ",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "19",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;


orgList[orgList.length] = new OrgModel({OrgID: 'org21', LogoImg: "Logo.png", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "註冊小型工程承建商（個人及獲授權簽署人）僱員協會",
    OrgScName: "註冊小型工程承建商（個人及獲授權簽署人）僱員協會",
    OrgEnName: "Hong Kong Construction Industry Clerical, Managerial and Professional Employees Association",
    OrgSTcName: "承僱",

    AboutUs: "本會是一個廣大業內工友為核心，以發揮高度團結和戶主精神為理想，更以謀求工人應有權益為宗旨的愛國工會組織。 積極爭取和維護全體工友的合理工作時間、工資和僱傭條件、協調勞資關係和處理勞資糾紛為工會日常要務。 舉辦各種文娛康樂、職業安全、技術交流等則為本會的經常活動。 凡從事油漆業和製漆業的工友，年齡在十六歲以上，均歡迎親臨本會辦理入會手續。 ",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "20",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;

orgList[orgList.length] = new OrgModel({OrgID: 'org23', LogoImg: "", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "香港天花間隔從業員工會",
    OrgScName: "香港天花間隔從業員工會",
    OrgEnName: "Hong Kong Ceiling and Partition Workers Union",
    OrgSTcName: "天花",

    AboutUs: "",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    OrgGroupID: "group1",
    SubGroupOrder: "21",

    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;

orgList[orgList.length] = new OrgModel({OrgID: 'org22', LogoImg: "", SlideImg: [
    { Img: 'bg1.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg2.jpg', Caption: "爭取權益，團結友愛！" },
    { Img: 'bg3.jpg', Caption: "爭取權益，團結友愛！" }
], OrgTcName: "駐地盤人員協會",
    OrgScName: "駐地盤人員協會",
    OrgEnName: "Resident Site Staff Association",
    OrgSTcName: "駐協",

    AboutUs: "",
    Phone: "(852) 2388 6887",
    Email: "hkciegu@yahoo.com.hk",
    Address: "九龍油麻地上海街383號華興商業中心2字樓",
    IsSubOrg: true,
    SubGroupOrder: "20",

    OrgGroupID: "group1",
    Service: [

    ],
    Purpose: [


    ],
    Downloads: [

    ]
})
;


conn.once('open', function () {



    //  removeAll();

    OrgModel.count(function (err, c) {
        console.log('Count is ' + c);
    });
    OrgModel.find(function (err, orgs) {
        if (err) return console.error(err);
        //   orgs[orgs.length - 1].SlideImg.forEach(function (img) {
        //     readImgByFilename(gfs,img._id+img.Img);
//console.log(img._id+img.Img);

    });

    console.log("count list " + orgList.length);
    for (index = 0; index < orgList.length; index++) {
//console.log(orgList[index]);

        orgList[index].save(function (err, org) {

            //  console.log(org.OrgTcName);
        });

    }


    console.log("albumList  " + albumList.length);

    for (index = 0; index < albumList.length; index++) {
//console.log(orgList[index]);

        albumList[index].save(function (err, album) {
            if (err) return console.error(err);

            console.log(album.Caption);
        });

    }


//  org.save(function (err, org) {

    /*

     console.log(org.LogoImg);

     writeStream = gfs.createWriteStream({ filename: org._id + org.LogoImg, mode: 'w' });
     fs.createReadStream(org.LogoImg).pipe(writeStream);

     // after the write is finished


     org.SlideImg.forEach(function (img) {

     console.log(img);
     buffer = '';
     writeStream = gfs.createWriteStream({ filename: img._id + img.Img, mode: 'w' });
     fs.createReadStream(img.Img).pipe(writeStream);

     // after the write is finished

     });
     */


//    });


    /*
     org.save(function(err,org){


     org.SlideImg.forEach(function(img){

     console.log(img);
     buffer='';
     writeStream = gfs.createWriteStream({ filename: img._id+img.Img,mode:'w' });
     fs.createReadStream("original.png").pipe(writeStream);

     // after the write is finished

     writeStream.on("close", function () {
     // read file, buffering data as we go
     readStream = gfs.createReadStream({ filename: "origin2.png" });

     readStream.on("data", function (chunk) {
     buffer += chunk;
     });

     // dump contents to console when complete
     readStream.on("end", function () {
     console.log("contents of file:\n\n", buffer);
     });
     });

     });
     });

     */


    // all se
});

//  console.log(org.SlideImg[0].Img._id);

exports.readImgByFilename = function (filename, res, callback) {


    OrgModel.count(function (err, c) {
        console.log('Count is ' + c);
    });

    bufferB = "";

    // read file, buffering data as we go


    gfs.files.findOne({ filename: filename }, function (err, file) {

        //   console.log(file);
        if (file != null) {
            lastModified = file.uploadDate;
            // put logic here to cache to disk.
            //     mimeType = file.metadata.contentType;
            //
            readStream = gfs.createReadStream({ filename: filename });

            res.writeHead('200', {'Content-Type': 'png'});
            readStream.pipe(res);

        } else {
            res.writeHead(200, {'Content-Type': ""});
            res.write('404 Not Found\n');
            res.end();
        }

    })


    /*
     readStream.on("data", function (chunk) {
     bufferB += chunk;
     });

     // dump contents to console when complete
     readStream.on("end", function () {
     conn.close();

     console.log("Done");
     //    console.log(bufferB);
     callback(bufferB);
     //     return bufferB;
     });

     */

}


exports.save = function (filename, res, callback) {
    org.save(function (err, org) {


        org.SlideImg.forEach(function (img) {

            //   console.log(img);
            buffer = '';
            writeStream = gfs.createWriteStream({ filename: img._id + img.Img, mode: 'w' });
            fs.createReadStream(img.Img).pipe(writeStream);

            // after the write is finished


        });
    });


}


exports.findAllOrg = function (res) {


    OrgModel.find({IsSubOrg: true}).sort({SubGroupOrder: 1}).exec(function (err, orgs) {

        if (err) return console.error(err);

        res.send(orgs);
    });


}

exports.findAlbumDictByOrgId = function (orgId,res) {


    AlbumModel.find({OrgID:orgId}).distinct('AlbumName', function (err, result) {
        if (err) return handleError(err);
        var resultArray = new Array;
        for (index = 0; index < result.length; index++) {
            AlbumModel.findOne({ AlbumName: result[index] }, function (err, album) {
                resultArray[resultArray.length] = album;

                console.log(resultArray);
                if (resultArray.length == result.length) {
                    res.send(resultArray);
                }

            });
        }

    });


}
exports.findAllMsgs = function (res) {

    MsgModel.find({}).sort({MSG_Date: -1}).exec(function (err, docs) {

        if (err) return console.error(err);

        res.send(docs);
    });


}

exports.findMsgsById = function (res, msgId) {


    MsgModel.find({MSG_ID: msgId}, function (err, msgs) {
        if (err) return console.error(err);

        res.send(msgs);


    });


};

exports.findMsgsByCId = function (res, cId) {


    MsgModel.find({Category_ID: cId}, function (err, msgs) {
        if (err) return console.error(err);

        res.send(msgs);


    });


};






exports.findOrgById = function (orgId, res) {


    OrgModel.find({OrgID: orgId}, function (err, orgs) {
        if (err) return console.error(err);

        res.send(orgs);


    });


}

exports.findMsgById = function (msgId, res) {


    MsgModel.find({MSG_ID: msgId}, function (err, msgs) {
        if (err) return console.error(err);

        res.send(msgs);


    });


}

function removeAll() {

    OrgModel.remove(function (err, orgs) {
        if (err) return handleError(err);


    });

    /*
    AlbumModel.remove(function (err, orgs) {
        if (err) return handleError(err);


    });
    /*
     gfs.files.find(function (err, file) {

     file.toArray(function (err, items) {
     console.log(items);
     items.forEach(function (img) {
     gfs.remove({_id: img._id}, function (err) {
     if (err) return handleError(err);
     console.log('success');
     });
     });

     });

     })
     */
}




