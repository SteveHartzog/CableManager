define('mocks', [
    ],
    function () {
        return {
            user: {
                "UserID":"E47CC3B3B6A7088D82963377B4FC161E49475910BD681FFDACC189B2B826BF257CE20D25F6C226B1D99939D7F5CF296B58C1832A96E7EB83",
                "Username":"testuser@wfu.edu",
                "OldPassword":null
                ,"NewPassword":null
                ,"FirstName":"Test"
                ,"LastName":"User"
                ,"Email":"testuser@wfu.edu"
                ,"CustomerGuid":"9721800E-8879-57E7-77AB-C0F43547F228"
                ,"CustomerID":"Wake Forest University"
            }

            , packages: [
                {"Children":
                    [
                        {"Children":[],"PackageId":"7421071361","PackageName":"Prime Cable TV","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":6,"TotalLicenses":145,"UnlimitedLicenses":false},"ViewingArea":"private","PackageType":"core"},
                        {"Children":[],"PackageId":"7421079553","PackageName":"Business Advantage","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":0,"TotalLicenses":130,"UnlimitedLicenses":false},"ViewingArea":"private","PackageType":"core"}
                    ]
                    ,"PackageId":"7421063169","PackageName":"Basic Service Tier","ParentPackageId":"","LicenseInfo":{"UsedLicenses":6,"TotalLicenses":150,"UnlimitedLicenses":false},"ViewingArea":"private","PackageType":"bst"
                },
                {"Children":[],"PackageId":"7421071361","PackageName":"Prime Cable TV","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":6,"TotalLicenses":145,"UnlimitedLicenses":false},"ViewingArea":"private","PackageType":"core"},
                {"Children":[],"PackageId":"7421079553","PackageName":"Business Advantage","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":0,"TotalLicenses":130,"UnlimitedLicenses":false},"ViewingArea":"private","PackageType":"core"},
                {"Children":[],"PackageId":"12395246593","PackageName":"Movies Plus","ParentPackageId":"","LicenseInfo":{"UsedLicenses":3,"TotalLicenses":80,"UnlimitedLicenses":false},"ViewingArea":"private","PackageType":"bst"},
                {"Children":
                    [
                        {"Children":
                            [
                                {"Children":[],"PackageId":"7580618753","PackageName":"Music Choice","ParentPackageId":"7421071361","LicenseInfo":{"UsedLicenses":0,"TotalLicenses":0,"UnlimitedLicenses":true},"ViewingArea":"public","PackageType":"addon"}
                            ]
                            ,"PackageId":"7421071361","PackageName":"Prime Cable TV","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":2,"TotalLicenses":100,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"core"
                        },
                        {"Children":[],"PackageId":"7421087745","PackageName":"Digital News Tier","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":4,"TotalLicenses":120,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"core"}
                    ]
                    ,"PackageId":"7421063169","PackageName":"Basic Service Tier","ParentPackageId":"","LicenseInfo":{"UsedLicenses":4,"TotalLicenses":125,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"bst"
                },
                {"Children":
                    [
                        {"Children":[],"PackageId":"7580618753","PackageName":"Music Choice","ParentPackageId":"7421071361","LicenseInfo":{"UsedLicenses":0,"TotalLicenses":0,"UnlimitedLicenses":true},"ViewingArea":"public","PackageType":"addon"}
                    ]
                    ,"PackageId":"7421071361","PackageName":"Prime Cable TV","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":2,"TotalLicenses":100,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"core"
                },
                {"Children":[],"PackageId":"7421087745","PackageName":"Digital News Tier","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":4,"TotalLicenses":120,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"core"},
                {"Children":[],"PackageId":"7580618753","PackageName":"Music Choice","ParentPackageId":"7421071361","LicenseInfo":{"UsedLicenses":0,"TotalLicenses":0,"UnlimitedLicenses":true},"ViewingArea":"public","PackageType":"addon"},
                {"Children":[],"PackageId":"12395234305","PackageName":"Entertainment Plus","ParentPackageId":"","LicenseInfo":{"UsedLicenses":1,"TotalLicenses":100,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"bst"},
                {"Children":
                    [
                        {"Children":[],"PackageId":"7580563457","PackageName":"Tennis Channel","ParentPackageId":"7580506113","LicenseInfo":{"UsedLicenses":0,"TotalLicenses":20,"UnlimitedLicenses":false},"ViewingArea":"common","PackageType":"addon"}
                    ]
                    ,"PackageId":"7580506113","PackageName":"Bars & Restaurants TV","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":0,"TotalLicenses":20,"UnlimitedLicenses":false},"ViewingArea":"common","PackageType":"core"
                },
                {"Children":[],"PackageId":"7580563457","PackageName":"Tennis Channel","ParentPackageId":"7580506113","LicenseInfo":{"UsedLicenses":0,"TotalLicenses":20,"UnlimitedLicenses":false},"ViewingArea":"common","PackageType":"addon"},
                {"Children":[],"PackageId":"7580618753","PackageName":"Music Choice","ParentPackageId":"7421071361","LicenseInfo":{"UsedLicenses":0,"TotalLicenses":0,"UnlimitedLicenses":true},"ViewingArea":"common","PackageType":"addon"},
                {"Children":[],"PackageId":"12395224065","PackageName":"Local TV","ParentPackageId":"","LicenseInfo":{"UsedLicenses":6,"TotalLicenses":80,"UnlimitedLicenses":false},"ViewingArea":"common","PackageType":"core"}
            ]

            , packageChannels: function(viewingArea, packageId) {
                "use strict";
                switch (viewingArea + "|" + packageId) {
                    case "Private|7421063169":
                        return [ // Private > Basic Service Tier
                            {"Channel":{"ChannelId":"47540","ChannelName":"PBS Kids Sprout","provider_name":"SPROUT","publishing_point":"SPROUTE_HD","channel_no":null},"PartOfPackageId":"7421063169","PartOfPackageName":"Basic Service Tier","ViewingArea":"private","customer_channel_no":null},
                            {"Channel":{"ChannelId":"34254","ChannelName":"PBS - MV","provider_name":"WEDWDT","publishing_point":"WEDWDT","channel_no":null},"PartOfPackageId":"7421063169","PartOfPackageName":"Basic Service Tier","ViewingArea":"private","customer_channel_no":null}
                        ];
                    case "Private|12395246593":
                        return [ // Private > Movies Plus
                            {"Channel":{"ChannelId":"42642","ChannelName":"TNT","provider_name":"TNTHD","publishing_point":"TNTHD","channel_no":null},"PartOfPackageId":"12395246593","PartOfPackageName":"Movies Plus","ViewingArea":"private","customer_channel_no":null}
                        ];
                    case "Private|7421071361":
                        return [ // Private > Basic Service Tier > Prime Cable TV
                            {"Channel":{"ChannelId":"64630","ChannelName":"MTV HD West","provider_name":"MTVPHD","publishing_point":"MTVPHD","channel_no":null},"PartOfPackageId":"7421071361","PartOfPackageName":"Prime Cable TV","ViewingArea":"private","customer_channel_no":null},
                            {"Channel":{"ChannelId":"63324","ChannelName":"ABC Family HD West","provider_name":"ABCFHDP","publishing_point":"ABCFW_HD","channel_no":null},"PartOfPackageId":"7421071361","PartOfPackageName":"Prime Cable TV","ViewingArea":"private","customer_channel_no":null},
                            {"Channel":{"ChannelId":"58646","ChannelName":"CNN HD","provider_name":"CNNHD","publishing_point":"CNN_HD","channel_no":"6"},"PartOfPackageId":"7421071361","PartOfPackageName":"Prime Cable TV","ViewingArea":"private","customer_channel_no":null},
                            {"Channel":{"ChannelId":"58631","ChannelName":"CNN Espanol","provider_name":"CNNE","publishing_point":"CNNESP_SD","channel_no":null},"PartOfPackageId":"7421071361","PartOfPackageName":"Prime Cable TV","ViewingArea":"private","customer_channel_no":null},
                            {"Channel":{"ChannelId":"57394","ChannelName":"Animal Planet HD","provider_name":"APLHD","publishing_point":"AP_HD","channel_no":null},"PartOfPackageId":"7421071361","PartOfPackageName":"Prime Cable TV","ViewingArea":"private","customer_channel_no":null},
                            {"Channel":{"ChannelId":"51529","ChannelName":"A&E HD","provider_name":"AETVHD","publishing_point":"ANE_HD","channel_no":null},"PartOfPackageId":"7421071361","PartOfPackageName":"Prime Cable TV","ViewingArea":"private","customer_channel_no":null}
                        ];
                    case "Private|7421079553":
                        return [ // Private > Basic Service Tier > Business Advantage
                            {"Channel":{"ChannelId":"58646","ChannelName":"CNN HD","provider_name":"CNNHD","publishing_point":"CNN_HD","channel_no":"6"},"PartOfPackageId":"7421079553","PartOfPackageName":"Business Advantage","ViewingArea":"private","customer_channel_no":null},
                            {"Channel":{"ChannelId":"71799","ChannelName":"Bloomberg TV","provider_name":"BLOOMHD","publishing_point":"BLOOMHD","channel_no":"8"},"PartOfPackageId":"7421079553","PartOfPackageName":"Business Advantage","ViewingArea":"private","customer_channel_no":null}
                        ];
                    case "Public|7421063169":
                        return [ // Public > Basic Service Tier
                            {"Channel":{"ChannelId":"47540","ChannelName":"PBS Kids Sprout","provider_name":"SPROUT","publishing_point":"SPROUTE_HD","channel_no":null},"PartOfPackageId":"7421063169","PartOfPackageName":"Basic Service Tier","ViewingArea":"public","customer_channel_no":null},
                            {"Channel":{"ChannelId":"34254","ChannelName":"PBS - MV","provider_name":"WEDWDT","publishing_point":"WEDWDT","channel_no":null},"PartOfPackageId":"7421063169","PartOfPackageName":"Basic Service Tier","ViewingArea":"public","customer_channel_no":null}
                        ];
                    case "Public|7421071361":
                        return [ // Public > Basic Service Tier > Prime Cable TV
                            {"Channel":{"ChannelId":"64630","ChannelName":"MTV HD West","provider_name":"MTVPHD","publishing_point":"MTVPHD","channel_no":null},"PartOfPackageId":"7421071361","PartOfPackageName":"Prime Cable TV","ViewingArea":"public","customer_channel_no":null},
                            {"Channel":{"ChannelId":"63324","ChannelName":"ABC Family HD West","provider_name":"ABCFHDP","publishing_point":"ABCFW_HD","channel_no":null},"PartOfPackageId":"7421071361","PartOfPackageName":"Prime Cable TV","ViewingArea":"public","customer_channel_no":null},
                            {"Channel":{"ChannelId":"58646","ChannelName":"CNN HD","provider_name":"CNNHD","publishing_point":"CNN_HD","channel_no":"6"},"PartOfPackageId":"7421071361","PartOfPackageName":"Prime Cable TV","ViewingArea":"public","customer_channel_no":null},
                            {"Channel":{"ChannelId":"58631","ChannelName":"CNN Espanol","provider_name":"CNNE","publishing_point":"CNNESP_SD","channel_no":null},"PartOfPackageId":"7421071361","PartOfPackageName":"Prime Cable TV","ViewingArea":"public","customer_channel_no":null},
                            {"Channel":{"ChannelId":"57394","ChannelName":"Animal Planet HD","provider_name":"APLHD","publishing_point":"AP_HD","channel_no":null},"PartOfPackageId":"7421071361","PartOfPackageName":"Prime Cable TV","ViewingArea":"public","customer_channel_no":null},
                            {"Channel":{"ChannelId":"51529","ChannelName":"A&E HD","provider_name":"AETVHD","publishing_point":"ANE_HD","channel_no":null},"PartOfPackageId":"7421071361","PartOfPackageName":"Prime Cable TV","ViewingArea":"public","customer_channel_no":null}
                        ];
                    case "Public|7580618753":
                        return [ // Public > Basic Service Tier > Prime Cable TV > Music Choice
                            {"Channel":{"ChannelId":"64630","ChannelName":"MTV HD West","provider_name":"MTVPHD","publishing_point":"MTVPHD","channel_no":null},"PartOfPackageId":"7580618753","PartOfPackageName":"Music Choice","ViewingArea":"public","customer_channel_no":null},
                            {"Channel":{"ChannelId":"30418","ChannelName":"MTV Hits","provider_name":"MTVHIT","publishing_point":"MTVHIT","channel_no":null},"PartOfPackageId":"7580618753","PartOfPackageName":"Music Choice","ViewingArea":"public","customer_channel_no":null},
                            {"Channel":{"ChannelId":"30419","ChannelName":"MTV Jams","provider_name":"MTVJAMS","publishing_point":"MTVJAMS","channel_no":null},"PartOfPackageId":"7580618753","PartOfPackageName":"Music Choice","ViewingArea":"public","customer_channel_no":null}
                        ];
                    case "Public|7421087745":
                        return [ // Public > Basic Service Tier > Digital News Tier
                            {"Channel":{"ChannelId":"71799","ChannelName":"Bloomberg TV","provider_name":"BLOOMHD","publishing_point":"BLOOMHD","channel_no":"8"},"PartOfPackageId":"7421087745","PartOfPackageName":"Digital News Tier","ViewingArea":"public","customer_channel_no":null},
                            {"Channel":{"ChannelId":"26849","ChannelName":"CNBC World","provider_name":"CNBCWLD","publishing_point":"CNBCWORLDE_SD","channel_no":null},"PartOfPackageId":"7421087745","PartOfPackageName":"Digital News Tier","ViewingArea":"public","customer_channel_no":null},
                            {"Channel":{"ChannelId":"60179","ChannelName":"Fox News HD","provider_name":"FNCHD","publishing_point":"FNews_HD","channel_no":"1"},"PartOfPackageId":"7421087745","PartOfPackageName":"Digital News Tier","ViewingArea":"public","customer_channel_no":null},
                            {"Channel":{"ChannelId":"58646","ChannelName":"CNN HD","provider_name":"CNNHD","publishing_point":"CNN_HD","channel_no":"6"},"PartOfPackageId":"7421087745","PartOfPackageName":"Digital News Tier","ViewingArea":"public","customer_channel_no":null},
                            {"Channel":{"ChannelId":"10146","ChannelName":"CNN International","provider_name":"CNNI","publishing_point":"CNNINTLE_SD","channel_no":"5"},"PartOfPackageId":"7421087745","PartOfPackageName":"Digital News Tier","ViewingArea":"public","customer_channel_no":null}
                        ];
                    case "Public|12395234305":
                        return [ // Public > Entertainment Plus
                            {"Channel":{"ChannelId":"21883","ChannelName":"Boomerang","provider_name":"BOOM","publishing_point":"BOOME_SD","channel_no":null},"PartOfPackageId":"12395234305","PartOfPackageName":"Entertainment Plus","ViewingArea":"public","customer_channel_no":null},
                            {"Channel":{"ChannelId":"50747","ChannelName":"Food Network HD","provider_name":"FOODHD","publishing_point":"Food_HD","channel_no":null},"PartOfPackageId":"12395234305","PartOfPackageName":"Entertainment Plus","ViewingArea":"public","customer_channel_no":null},
                            {"Channel":{"ChannelId":"49788","ChannelName":"HGTV HD","provider_name":"HGTVD","publishing_point":"HGTV_HD","channel_no":null},"PartOfPackageId":"12395234305","PartOfPackageName":"Entertainment Plus","ViewingArea":"public","customer_channel_no":null}
                        ];
                    default:
                        return [];
                }
            }

            , lineups: [
                {"LineupId":"202","LineupName":"WFU Student Premium","Description":"Movie channels, etc.","ViewingArea":"private","TotalIssuedLineups":3
                    ,"Packages":[{"Children":[],"PackageId":"12395246593","PackageName":"Movies Plus","ParentPackageId":"","LicenseInfo":{"UsedLicenses":3,"TotalLicenses":80,"UnlimitedLicenses":false},"ViewingArea":"private","PackageType":"bst"}]
                    ,"Channels":[{"Channel":{"ChannelId":"42642","ChannelName":"TNT","provider_name":"TNTHD","publishing_point":"TNTHD","channel_no":null},"PartOfPackageId":"12395246593","PartOfPackageName":null,"ViewingArea":"private","customer_channel_no":null}]
                    ,"Groups":[]},
                {"LineupId":"203","LineupName":"WFU TV","Description":"24 hr classroom monitoring.","ViewingArea":"public","TotalIssuedLineups":1
                    ,"Packages":[{"Children":[],"PackageId":"12395234305","PackageName":"Entertainment Plus","ParentPackageId":"","LicenseInfo":{"UsedLicenses":1,"TotalLicenses":100,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"bst"}]
                    ,"Channels":[
                        {"Channel":{"ChannelId":"50747","ChannelName":"Food Network HD","provider_name":"FOODHD","publishing_point":"Food_HD","channel_no":null},"PartOfPackageId":"12395234305","PartOfPackageName":null,"ViewingArea":"public","customer_channel_no":null},
                        {"Channel":{"ChannelId":"49788","ChannelName":"HGTV HD","provider_name":"HGTVD","publishing_point":"HGTV_HD","channel_no":null},"PartOfPackageId":"12395234305","PartOfPackageName":null,"ViewingArea":"public","customer_channel_no":null}
                    ]
                    ,"Groups":[
                        {"GroupId":"127","GroupName":"University Public Spaces","Description":"Public areas, etc.","NumberOfSubscribers":1,"ViewingArea":"public"
                            ,"Subscribers":null
                            ,"Lineups":null
                        },
                        {"GroupId":"132","GroupName":"University Retail","Description":"University Retail locations, including bookstore","NumberOfSubscribers":0,"ViewingArea":"public"
                            ,"Subscribers":null
                            ,"Lineups":null
                        }
                    ]
                },
                {"LineupId":"204","LineupName":"WFU Local","Description":"Local affiliates (NBC, ABC, CBS, FOX, etc).","ViewingArea":"common","TotalIssuedLineups":6
                    ,"Packages":[{"Children":[],"PackageId":"12395224065","PackageName":"Local TV","ParentPackageId":"","LicenseInfo":{"UsedLicenses":6,"TotalLicenses":80,"UnlimitedLicenses":false},"ViewingArea":"common","PackageType":"core"}]
                    ,"Channels":[{"Channel":{"ChannelId":"74593","ChannelName":"NY1 Queens HD","provider_name":"NY1","publishing_point":"NY1_QUEENS_HD","channel_no":null},"PartOfPackageId":"12395224065","PartOfPackageName":null,"ViewingArea":"common","customer_channel_no":null}]
                    ,"Groups":[
                        {"GroupId":"125","GroupName":"University Eateries","Description":"University Bars, Restaurants, Cafeterias, etc.","NumberOfSubscribers":2,"ViewingArea":"common"
                            ,"Subscribers":null
                            ,"Lineups":null
                        },
                        {"GroupId":"128","GroupName":"Faculty","Description":"Professors, aides, etc.","NumberOfSubscribers":2,"ViewingArea":"common"
                            ,"Subscribers":null
                            ,"Lineups":null
                        },
                        {"GroupId":"148","GroupName":"Fraternity Houses","Description":"All of the Fraternity Houses","NumberOfSubscribers":1,"ViewingArea":"common"
                            ,"Subscribers":null
                            ,"Lineups":null
                        },
                        {"GroupId":"160","GroupName":"University Offices","Description":"Common viewing areas in University Offices","NumberOfSubscribers":1,"ViewingArea":"common"
                            ,"Subscribers":null,"Lineups":null
                        }
                    ]
                },
                {"LineupId":"205","LineupName":"WFU News","Description":"News where you need it the most.","ViewingArea":"public","TotalIssuedLineups":2
                    ,"Packages":[{"Children":[],"PackageId":"7421087745","PackageName":"Digital News Tier","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":4,"TotalLicenses":120,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"core"}]
                    ,"Channels":[
                        {"Channel":{"ChannelId":"71799","ChannelName":"Bloomberg TV","provider_name":"BLOOMHD","publishing_point":"BLOOMHD","channel_no":"8"},"PartOfPackageId":"7421087745","PartOfPackageName":null,"ViewingArea":"public","customer_channel_no":null},
                        {"Channel":{"ChannelId":"10146","ChannelName":"CNN International","provider_name":"CNNI","publishing_point":"CNNINTLE_SD","channel_no":"5"},"PartOfPackageId":"7421087745","PartOfPackageName":null,"ViewingArea":"public","customer_channel_no":null},
                        {"Channel":{"ChannelId":"60179","ChannelName":"Fox News HD","provider_name":"FNCHD","publishing_point":"FNews_HD","channel_no":"1"},"PartOfPackageId":"7421087745","PartOfPackageName":null,"ViewingArea":"public","customer_channel_no":null}
                    ]
                    ,"Groups":[
                        {"GroupId":"127","GroupName":"University Public Spaces","Description":"Public areas, etc.","NumberOfSubscribers":1,"ViewingArea":"public"
                            ,"Subscribers":null
                            ,"Lineups":null
                        },
                        {"GroupId":"132","GroupName":"University Retail","Description":"University Retail locations, including bookstore","NumberOfSubscribers":0,"ViewingArea":"public"
                            ,"Subscribers":null
                            ,"Lineups":null
                        }
                    ]
                },
                {"LineupId":"208","LineupName":"WFU Student Standard","Description":"Standard package","ViewingArea":"private","TotalIssuedLineups":6
                    ,"Packages":[{"Children":[],"PackageId":"7421071361","PackageName":"Prime Cable TV","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":6,"TotalLicenses":145,"UnlimitedLicenses":false},"ViewingArea":"private","PackageType":"core"}]
                    ,"Channels":[
                        {"Channel":{"ChannelId":"57394","ChannelName":"Animal Planet HD","provider_name":"APLHD","publishing_point":"AP_HD","channel_no":null},"PartOfPackageId":"7421071361","PartOfPackageName":null,"ViewingArea":"private","customer_channel_no":null},
                        {"Channel":{"ChannelId":"58646","ChannelName":"CNN HD","provider_name":"CNNHD","publishing_point":"CNN_HD","channel_no":"6"},"PartOfPackageId":"7421071361","PartOfPackageName":null,"ViewingArea":"private","customer_channel_no":null},
                        {"Channel":{"ChannelId":"64630","ChannelName":"MTV HD West","provider_name":"MTVPHD","publishing_point":"MTVPHD","channel_no":null},"PartOfPackageId":"7421071361","PartOfPackageName":null,"ViewingArea":"private","customer_channel_no":null}
                    ]
                    ,"Groups":[
                        {"GroupId":"123","GroupName":"Students","Description":"Student body at large.","NumberOfSubscribers":6,"ViewingArea":"private"
                            ,"Subscribers":null
                            ,"Lineups":null
                        }
                    ]
                },
                {"LineupId":"261","LineupName":"WFU Sports","Description":"Sports Lineup","ViewingArea":"public","TotalIssuedLineups":2
                    ,"Packages":[{"Children":[],"PackageId":"7421071361","PackageName":"Prime Cable TV","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":2,"TotalLicenses":100,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"core"}]
                    ,"Channels":[{"Channel":{"ChannelId":"58646","ChannelName":"CNN HD","provider_name":"CNNHD","publishing_point":"CNN_HD","channel_no":"6"},"PartOfPackageId":"7421071361","PartOfPackageName":null,"ViewingArea":"public","customer_channel_no":null}]
                    ,"Groups":[]
                },
                {"LineupId":"266","LineupName":"Soothing Sounds","Description":"test","ViewingArea":"public","TotalIssuedLineups":0
                    ,"Packages":[{"Children":[],"PackageId":"7580618753","PackageName":"Music Choice","ParentPackageId":"7421071361","LicenseInfo":{"UsedLicenses":0,"TotalLicenses":0,"UnlimitedLicenses":true},"ViewingArea":"public","PackageType":"addon"}]
                    ,"Channels":[
                        {"Channel":{"ChannelId":"30418","ChannelName":"MTV Hits","provider_name":"MTVHIT","publishing_point":"MTVHIT","channel_no":null},"PartOfPackageId":"7580618753","PartOfPackageName":null,"ViewingArea":"public","customer_channel_no":null},
                        {"Channel":{"ChannelId":"30419","ChannelName":"MTV Jams","provider_name":"MTVJAMS","publishing_point":"MTVJAMS","channel_no":null},"PartOfPackageId":"7580618753","PartOfPackageName":null,"ViewingArea":"public","customer_channel_no":null}
                    ]
                    ,"Groups":[]},
                {"LineupId":"269","LineupName":"News Lineup for Public Areas","Description":"Some description here","ViewingArea":"public","TotalIssuedLineups":3
                    ,"Packages":[
                        {"Children":[],"PackageId":"7421063169","PackageName":"Basic Service Tier","ParentPackageId":"","LicenseInfo":{"UsedLicenses":4,"TotalLicenses":125,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"bst"},
                        {"Children":[],"PackageId":"7421087745","PackageName":"Digital News Tier","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":4,"TotalLicenses":120,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"core"}
                    ]
                    ,"Channels":[
                        {"Channel":{"ChannelId":"71799","ChannelName":"Bloomberg TV","provider_name":"BLOOMHD","publishing_point":"BLOOMHD","channel_no":"8"},"PartOfPackageId":"7421087745","PartOfPackageName":null,"ViewingArea":"public","customer_channel_no":null},
                        {"Channel":{"ChannelId":"58646","ChannelName":"CNN HD","provider_name":"CNNHD","publishing_point":"CNN_HD","channel_no":"6"},"PartOfPackageId":"7421087745","PartOfPackageName":null,"ViewingArea":"public","customer_channel_no":null},
                        {"Channel":{"ChannelId":"60179","ChannelName":"Fox News HD","provider_name":"FNCHD","publishing_point":"FNews_HD","channel_no":"1"},"PartOfPackageId":"7421087745","PartOfPackageName":null,"ViewingArea":"public","customer_channel_no":null},
                        {"Channel":{"ChannelId":"34254","ChannelName":"PBS - MV","provider_name":"WEDWDT","publishing_point":"WEDWDT","channel_no":null},"PartOfPackageId":"7421063169","PartOfPackageName":null,"ViewingArea":"public","customer_channel_no":null}
                    ]
                    ,"Groups":[
                        {"GroupId":"178","GroupName":"A New Public Group","Description":"Description here","NumberOfSubscribers":3,"ViewingArea":"public"
                            ,"Subscribers":null
                            ,"Lineups":null
                        }
                    ]
                }
            ]

            , subscribers: [
                {"SubscriberId":"112","FirstName":"University","LastName":"Admissions Office","UserName":"admissions","Email":"admissions@wfu.edu","Password":"@rFsuyLz","ViewingArea":"Public"
                    ,"Group":{"GroupId":"178","GroupName":"A New Public Group","Description":"Description here","NumberOfSubscribers":3,"ViewingArea":"public","Subscribers":null,"Lineups":null}
                    ,"LineupIds":[205,269]
                    ,"Lineups":null},
                {"SubscriberId":"107","FirstName":"University","LastName":"Lobby","UserName":"lobby","Email":"lobby@wfu.edu","Password":"password3","ViewingArea":"Public"
                    ,"Group":{"GroupId":"178","GroupName":"A New Public Group","Description":"Description here","NumberOfSubscribers":3,"ViewingArea":"public","Subscribers":null,"Lineups":null}
                    ,"LineupIds":[261,269]
                    ,"Lineups":null},
                {"SubscriberId":"105","FirstName":"University","LastName":"Diner","UserName":"diner","Email":"diner@wfu.edu","Password":"password3","ViewingArea":"Common"
                    ,"Group":{"GroupId":"125","GroupName":"University Eateries","Description":"University Bars, Restaurants, Cafeterias, etc.","NumberOfSubscribers":2,"ViewingArea":"common","Subscribers":null,"Lineups":null}
                    ,"LineupIds":[204]
                    ,"Lineups":null},
                {"SubscriberId":"106","FirstName":"Joey","LastName":"College","UserName":"jcollege","Email":"jcollege@wfu.edu","Password":"password3","ViewingArea":"Private"
                    ,"Group":{"GroupId":"123","GroupName":"Students","Description":"Student body at large.","NumberOfSubscribers":6,"ViewingArea":"private","Subscribers":null,"Lineups":null}
                    ,"LineupIds":[208,202]
                    ,"Lineups":null},
                {"SubscriberId":"110","FirstName":"Professor","LastName":"Terguson","UserName":"terguson","Email":"terguson@wfu.edu","Password":"password3","ViewingArea":"Common"
                    ,"Group":{"GroupId":"128","GroupName":"Faculty","Description":"Professors, aides, etc.","NumberOfSubscribers":2,"ViewingArea":"common","Subscribers":null,"Lineups":null}
                    ,"LineupIds":[204]
                    ,"Lineups":null},
                {"SubscriberId":"111","FirstName":"University","LastName":"Cafeteria","UserName":"uc_cafeteria","Email":"uc_acf@wfu.edu","Password":"password3","ViewingArea":"Common"
                    ,"Group":{"GroupId":"125","GroupName":"University Eateries","Description":"University Bars, Restaurants, Cafeterias, etc.","NumberOfSubscribers":2,"ViewingArea":"common","Subscribers":null,"Lineups":null}
                    ,"LineupIds":[204]
                    ,"Lineups":null},
                {"SubscriberId":"113","FirstName":"University","LastName":"Arena","UserName":"universityarena","Email":"universityarena@wfu.edu","Password":"password3","ViewingArea":"Common"
                    ,"Group":{"GroupId":"128","GroupName":"Faculty","Description":"Professors, aides, etc.","NumberOfSubscribers":2,"ViewingArea":"common","Subscribers":null,"Lineups":null}
                    ,"LineupIds":[204]
                    ,"Lineups":null},
                {"SubscriberId":"128","FirstName":"University","LastName":"Bookstore","UserName":"books","Email":"books@wfu.edu","Password":"password3","ViewingArea":"Public"
                    ,"Group":{"GroupId":"178","GroupName":"A New Public Group","Description":"Description here","NumberOfSubscribers":3,"ViewingArea":"public","Subscribers":null,"Lineups":null}
                    ,"LineupIds":[269]
                    ,"Lineups":null},
                {"SubscriberId":"135","FirstName":"Biff","LastName":"Smith","UserName":"biff","Email":"biff@wfu.edu","Password":"password3","ViewingArea":"Private"
                    ,"Group":{"GroupId":"123","GroupName":"Students","Description":"Student body at large.","NumberOfSubscribers":6,"ViewingArea":"private","Subscribers":null,"Lineups":null}
                    ,"LineupIds":[208,202]
                    ,"Lineups":null},
                {"SubscriberId":"136","FirstName":"Roger","LastName":"Smith","UserName":"roger","Email":"roger@wfu.edu","Password":"password3","ViewingArea":"Private",
                    "Group":{"GroupId":"123","GroupName":"Students","Description":"Student body at large.","NumberOfSubscribers":6,"ViewingArea":"private","Subscribers":null,"Lineups":null}
                    ,"LineupIds":[208]
                    ,"Lineups":null},
                {"SubscriberId":"138","FirstName":"House","LastName":"Sigma Pi","UserName":"sigma","Email":"sigma@wfu.edu","Password":"password3","ViewingArea":"Common",
                    "Group":{"GroupId":"148","GroupName":"Fraternity Houses","Description":"All of the Fraternity Houses","NumberOfSubscribers":1,"ViewingArea":"common","Subscribers":null,"Lineups":null}
                    ,"LineupIds":[204]
                    ,"Lineups":null},
                {"SubscriberId":"150","FirstName":"Thomas","LastName":"Jefferson","UserName":"tjefferson","Email":"tjefferson@wfu.edu","Password":"password3","ViewingArea":"Private"
                    ,"Group":{"GroupId":"123","GroupName":"Students","Description":"Student body at large.","NumberOfSubscribers":6,"ViewingArea":"private","Subscribers":null,"Lineups":null}
                    ,"LineupIds":[208,202]
                    ,"Lineups":null},
                {"SubscriberId":"148","FirstName":"University","LastName":"Presidents Office","UserName":"presidentsoffice","Email":"presidentsoffice@wfu.edu","Password":"password3","ViewingArea":"Common"
                    ,"Group":{"GroupId":"160","GroupName":"University Offices","Description":"Common viewing areas in University Offices","NumberOfSubscribers":1,"ViewingArea":"common","Subscribers":null,"Lineups":null}
                    ,"LineupIds":[204]
                    ,"Lineups":null},
                {"SubscriberId":"149","FirstName":"George","LastName":"Washington","UserName":"gwashington","Email":"gwashington@wfu.edu","Password":"password3","ViewingArea":"Private"
                    ,"Group":{"GroupId":"123","GroupName":"Students","Description":"Student body at large.","NumberOfSubscribers":6,"ViewingArea":"private","Subscribers":null,"Lineups":null}
                    ,"LineupIds":[208]
                    ,"Lineups":null},
                {"SubscriberId":"151","FirstName":"John","LastName":"Adams","UserName":"jadams","Email":"jadams@wfu.edu","Password":"passwords","ViewingArea":"Private"
                    ,"Group":{"GroupId":"123","GroupName":"Students","Description":"Student body at large.","NumberOfSubscribers":6,"ViewingArea":"private","Subscribers":null,"Lineups":null}
                    ,"LineupIds":[208]
                    ,"Lineups":null},
                {"SubscriberId":"157","FirstName":"Public","LastName":"Area1","UserName":"publicarea","Email":"publicarea","Password":"password3","ViewingArea":"Public"
                    ,"Group":{"GroupId":"127","GroupName":"University Public Spaces","Description":"Public areas, etc.","NumberOfSubscribers":1,"ViewingArea":"public","Subscribers":null,"Lineups":null}
                    ,"LineupIds":[205,203,261]
                    ,"Lineups":null}
            ]

            , groups: [
                {"GroupId":"123","GroupName":"Students","Description":"Student body at large.","NumberOfSubscribers":6,"ViewingArea":"private"
                    ,"Subscribers":[
                        {"SubscriberId":"106","FirstName":"Joey","LastName":"College","UserName":"jcollege","Email":"jcollege@wfu.edu","Password":"password3","ViewingArea":"private",
                            "Group":{"GroupId":"123","GroupName":"Students","Description":"Student body at large.","NumberOfSubscribers":6,"ViewingArea":"private",
                                "Subscribers":null
                                ,"Lineups":null
                            }
                            ,"LineupIds":[208,202]
                            ,"Lineups":null
                        },
                        {"SubscriberId":"135","FirstName":"Biff","LastName":"Smith","UserName":"biff","Email":"biff@wfu.edu","Password":"password3","ViewingArea":"private",
                            "Group":{"GroupId":"123","GroupName":"Students","Description":"Student body at large.","NumberOfSubscribers":6,"ViewingArea":"private"
                                ,"Subscribers":null
                                ,"Lineups":null
                            }
                            ,"LineupIds":[208,202]
                            ,"Lineups":null
                        },
                        {"SubscriberId":"136","FirstName":"Roger","LastName":"Smith","UserName":"roger","Email":"roger@wfu.edu","Password":"password3","ViewingArea":"private",
                            "Group":{"GroupId":"123","GroupName":"Students","Description":"Student body at large.","NumberOfSubscribers":6,"ViewingArea":"private"
                                ,"Subscribers":null
                                ,"Lineups":null
                            }
                            ,"LineupIds":[208]
                            ,"Lineups":null
                        },
                        {"SubscriberId":"150","FirstName":"Thomas","LastName":"Jefferson","UserName":"tjefferson","Email":"tjefferson@wfu.edu","Password":"password3","ViewingArea":"private",
                            "Group":{"GroupId":"123","GroupName":"Students","Description":"Student body at large.","NumberOfSubscribers":6,"ViewingArea":"private"
                                ,"Subscribers":null
                                ,"Lineups":null
                            }
                            ,"LineupIds":[208,202]
                            ,"Lineups":null
                        },
                        {"SubscriberId":"149","FirstName":"George","LastName":"Washington","UserName":"gwashington","Email":"gwashington@wfu.edu","Password":"password3","ViewingArea":"private",
                            "Group":{"GroupId":"123","GroupName":"Students","Description":"Student body at large.","NumberOfSubscribers":6,"ViewingArea":"private"
                                ,"Subscribers":null
                                ,"Lineups":null
                            }
                            ,"LineupIds":[208]
                            ,"Lineups":null
                        },
                        {"SubscriberId":"151","FirstName":"John","LastName":"Adams","UserName":"jadams","Email":"jadams@wfu.edu","Password":"passwords","ViewingArea":"private",
                            "Group":{"GroupId":"123","GroupName":"Students","Description":"Student body at large.","NumberOfSubscribers":6,"ViewingArea":"private"
                                ,"Subscribers":null
                                ,"Lineups":null
                            }
                            ,"LineupIds":[208]
                            ,"Lineups":null
                        }
                    ]
                    ,"Lineups":[
                        {"LineupId":"208","LineupName":"WFU Student Standard","Description":"Standard package","ViewingArea":"private","TotalIssuedLineups":6
                            ,"Packages":[{"Children":[],"PackageId":"7421071361","PackageName":"Prime Cable TV","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":6,"TotalLicenses":145,"UnlimitedLicenses":false},"ViewingArea":"private","PackageType":"core"}]
                            ,"Channels":null
                            ,"Groups":null
                        }
                    ]
                },
                {"GroupId":"125","GroupName":"University Eateries","Description":"University Bars, Restaurants, Cafeterias, etc.","NumberOfSubscribers":2,"ViewingArea":"common",
                    "Subscribers":[
                        {"SubscriberId":"105","FirstName":"University","LastName":"Diner","UserName":"diner","Email":"diner@wfu.edu","Password":"password3","ViewingArea":"common",
                            "Group":{"GroupId":"125","GroupName":"University Eateries","Description":"University Bars, Restaurants, Cafeterias, etc.","NumberOfSubscribers":2,"ViewingArea":"common"
                                ,"Subscribers":null,"Lineups":null
                            }
                            ,"LineupIds":[204]
                            ,"Lineups":null
                        },
                        {"SubscriberId":"111","FirstName":"University","LastName":"Cafeteria","UserName":"uc_cafeteria","Email":"uc_acf@wfu.edu","Password":"password3","ViewingArea":"common",
                            "Group":{"GroupId":"125","GroupName":"University Eateries","Description":"University Bars, Restaurants, Cafeterias, etc.","NumberOfSubscribers":2,"ViewingArea":"common"
                                ,"Subscribers":null
                                ,"Lineups":null
                            }
                            ,"LineupIds":[204]
                            ,"Lineups":null
                        }
                    ]
                    ,"Lineups":[
                        {"LineupId":"204","LineupName":"WFU Local","Description":"Local affiliates (NBC, ABC, CBS, FOX, etc).","ViewingArea":"common","TotalIssuedLineups":6
                            ,"Packages":[{"Children":[],"PackageId":"12395224065","PackageName":"Local TV","ParentPackageId":"","LicenseInfo":{"UsedLicenses":6,"TotalLicenses":80,"UnlimitedLicenses":false},"ViewingArea":"common","PackageType":"core"}]
                            ,"Channels":null
                            ,"Groups":null
                        }
                    ]
                },
                {"GroupId":"128","GroupName":"Faculty","Description":"Professors, aides, etc.","NumberOfSubscribers":2,"ViewingArea":"common",
                    "Subscribers":[
                        {"SubscriberId":"110","FirstName":"Professor","LastName":"Terguson","UserName":"terguson","Email":"terguson@wfu.edu","Password":"password3","ViewingArea":"common",
                            "Group":{"GroupId":"128","GroupName":"Faculty","Description":"Professors, aides, etc.","NumberOfSubscribers":2,"ViewingArea":"common"
                                ,"Subscribers":null
                                ,"Lineups":null
                            }
                            ,"LineupIds":[204]
                            ,"Lineups":null
                        },
                        {"SubscriberId":"113","FirstName":"University","LastName":"Arena","UserName":"universityarena","Email":"universityarena@wfu.edu","Password":"password3","ViewingArea":"common",
                            "Group":{"GroupId":"128","GroupName":"Faculty","Description":"Professors, aides, etc.","NumberOfSubscribers":2,"ViewingArea":"common"
                                ,"Subscribers":null
                                ,"Lineups":null
                            }
                            ,"LineupIds":[204]
                            ,"Lineups":null
                        }
                    ]
                    ,"Lineups":[
                        {"LineupId":"204","LineupName":"WFU Local","Description":"Local affiliates (NBC, ABC, CBS, FOX, etc).","ViewingArea":"common","TotalIssuedLineups":6
                            ,"Packages":[{"Children":[],"PackageId":"12395224065","PackageName":"Local TV","ParentPackageId":"","LicenseInfo":{"UsedLicenses":6,"TotalLicenses":80,"UnlimitedLicenses":false},"ViewingArea":"common","PackageType":"core"}]
                            ,"Channels":null
                            ,"Groups":null
                        }
                    ]
                },
                {"GroupId":"127","GroupName":"University Public Spaces","Description":"Public areas, etc.","NumberOfSubscribers":1,"ViewingArea":"public",
                    "Subscribers":[
                        {"SubscriberId":"157","FirstName":"Public","LastName":"Area1","UserName":"publicarea","Email":"publicarea","Password":"password3","ViewingArea":"public",
                            "Group":{"GroupId":"127","GroupName":"University Public Spaces","Description":"Public areas, etc.","NumberOfSubscribers":1,"ViewingArea":"public"
                                ,"Subscribers":null
                                ,"Lineups":null
                            }
                            ,"LineupIds":[205,203,261]
                            ,"Lineups":null
                        }
                    ]
                    ,"Lineups":[
                        {"LineupId":"205","LineupName":"WFU News","Description":"News where you need it the most.","ViewingArea":"public","TotalIssuedLineups":2
                            ,"Packages":[{"Children":[],"PackageId":"7421087745","PackageName":"Digital News Tier","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":4,"TotalLicenses":120,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"core"}]
                            ,"Channels":null
                            ,"Groups":null
                        },
                        {"LineupId":"203","LineupName":"WFU TV","Description":"24 hr classroom monitoring.","ViewingArea":"public","TotalIssuedLineups":1
                            ,"Packages":[{"Children":[],"PackageId":"12395234305","PackageName":"Entertainment Plus","ParentPackageId":"","LicenseInfo":{"UsedLicenses":1,"TotalLicenses":100,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"bst"}]
                            ,"Channels":null
                            ,"Groups":null
                        }
                    ]
                },
                {"GroupId":"132","GroupName":"University Retail","Description":"University Retail locations, including bookstore","NumberOfSubscribers":0,"ViewingArea":"public",
                    "Subscribers":[]
                    ,"Lineups":[
                        {"LineupId":"205","LineupName":"WFU News","Description":"News where you need it the most.","ViewingArea":"public","TotalIssuedLineups":2
                            ,"Packages":[{"Children":[],"PackageId":"7421087745","PackageName":"Digital News Tier","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":4,"TotalLicenses":120,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"core"}]
                            ,"Channels":null
                            ,"Groups":null
                        },
                        {"LineupId":"203","LineupName":"WFU TV","Description":"24 hr classroom monitoring.","ViewingArea":"public","TotalIssuedLineups":1
                            ,"Packages":[{"Children":[],"PackageId":"12395234305","PackageName":"Entertainment Plus","ParentPackageId":"","LicenseInfo":{"UsedLicenses":1,"TotalLicenses":100,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"bst"}]
                            ,"Channels":null
                            ,"Groups":null
                        }
                    ]
                },
                {"GroupId":"148","GroupName":"Fraternity Houses","Description":"All of the Fraternity Houses","NumberOfSubscribers":1,"ViewingArea":"common",
                    "Subscribers":[
                        {"SubscriberId":"138","FirstName":"House","LastName":"Sigma Pi","UserName":"sigma","Email":"sigma@wfu.edu","Password":"password3","ViewingArea":"common",
                            "Group":{"GroupId":"148","GroupName":"Fraternity Houses","Description":"All of the Fraternity Houses","NumberOfSubscribers":1,"ViewingArea":"common"
                                ,"Subscribers":null
                                ,"Lineups":null
                            }
                            ,"LineupIds":[204]
                            ,"Lineups":null
                        }
                    ]
                    ,"Lineups":[
                        {"LineupId":"204","LineupName":"WFU Local","Description":"Local affiliates (NBC, ABC, CBS, FOX, etc).","ViewingArea":"common","TotalIssuedLineups":6
                            ,"Packages":[{"Children":[],"PackageId":"12395224065","PackageName":"Local TV","ParentPackageId":"","LicenseInfo":{"UsedLicenses":6,"TotalLicenses":80,"UnlimitedLicenses":false},"ViewingArea":"common","PackageType":"core"}]
                            ,"Channels":null
                            ,"Groups":null
                        }
                    ]
                },
                {"GroupId":"150","GroupName":"Sorority Houses","Description":"For all Sorority houses","NumberOfSubscribers":0,"ViewingArea":"common"
                    ,"Subscribers":[]
                    ,"Lineups":[]
                },
                {"GroupId":"160","GroupName":"University Offices","Description":"Common viewing areas in University Offices","NumberOfSubscribers":1,"ViewingArea":"common",
                    "Subscribers":[
                        {"SubscriberId":"148","FirstName":"University","LastName":"Presidents Office","UserName":"presidentsoffice","Email":"presidentsoffice@wfu.edu","Password":"password3","ViewingArea":"common",
                            "Group":{"GroupId":"160","GroupName":"University Offices","Description":"Common viewing areas in University Offices","NumberOfSubscribers":1,"ViewingArea":"common"
                                ,"Subscribers":null
                                ,"Lineups":null
                            }
                            ,"LineupIds":[204]
                            ,"Lineups":null
                        }
                    ]
                    ,"Lineups":[
                        {"LineupId":"204","LineupName":"WFU Local","Description":"Local affiliates (NBC, ABC, CBS, FOX, etc).","ViewingArea":"common","TotalIssuedLineups":6
                            ,"Packages":[{"Children":[],"PackageId":"12395224065","PackageName":"Local TV","ParentPackageId":"","LicenseInfo":{"UsedLicenses":6,"TotalLicenses":80,"UnlimitedLicenses":false},"ViewingArea":"common","PackageType":"core"}]
                            ,"Channels":null
                            ,"Groups":null
                        }
                    ]
                },
                {"GroupId":"176","GroupName":"Classrooms","Description":"","NumberOfSubscribers":0,"ViewingArea":"public"
                    ,"Subscribers":[]
                    ,"Lineups":[]
                },
                {"GroupId":"178","GroupName":"A New Public Group","Description":"Description here","NumberOfSubscribers":3,"ViewingArea":"public",
                    "Subscribers":[
                        {"SubscriberId":"112","FirstName":"University","LastName":"Admissions Office","UserName":"admissions","Email":"admissions@wfu.edu","Password":"@rFsuyLz","ViewingArea":"public",
                            "Group":{"GroupId":"178","GroupName":"A New Public Group","Description":"Description here","NumberOfSubscribers":3,"ViewingArea":"public"
                                ,"Subscribers":null
                                ,"Lineups":null
                            }
                            ,"LineupIds":[205,269]
                            ,"Lineups":null
                        },
                        {"SubscriberId":"107","FirstName":"University","LastName":"Lobby","UserName":"lobby","Email":"lobby@wfu.edu","Password":"password3","ViewingArea":"public",
                            "Group":{"GroupId":"178","GroupName":"A New Public Group","Description":"Description here","NumberOfSubscribers":3,"ViewingArea":"public"
                                ,"Subscribers":null
                                ,"Lineups":null
                            }
                            ,"LineupIds":[261,269]
                            ,"Lineups":null
                        },
                        {"SubscriberId":"128","FirstName":"University","LastName":"Bookstore","UserName":"books","Email":"books@wfu.edu","Password":"password3","ViewingArea":"public",
                            "Group":{"GroupId":"178","GroupName":"A New Public Group","Description":"Description here","NumberOfSubscribers":3,"ViewingArea":"public"
                                ,"Subscribers":null
                                ,"Lineups":null
                            }
                            ,"LineupIds":[269]
                            ,"Lineups":null
                        }
                    ]
                    ,"Lineups":[
                        {"LineupId":"269","LineupName":"News Lineup for Public Areas","Description":"Some description here","ViewingArea":"public","TotalIssuedLineups":3
                            ,"Packages":[
                                {"Children":[],"PackageId":"7421063169","PackageName":"Basic Service Tier","ParentPackageId":"","LicenseInfo":{"UsedLicenses":4,"TotalLicenses":125,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"bst"},
                                {"Children":[],"PackageId":"7421087745","PackageName":"Digital News Tier","ParentPackageId":"7421063169","LicenseInfo":{"UsedLicenses":4,"TotalLicenses":120,"UnlimitedLicenses":false},"ViewingArea":"public","PackageType":"core"}
                            ]
                            ,"Channels":null
                            ,"Groups":null
                        }
                    ]
                }
            ]
        };
    });
