(function () {
    let ehrId = getUrlParameter("ehr_id");
    let articles = [{
            "title": "RAS Mutation Clinical Risk Score to Predict Survival After Resection of Colorectal Liver Metastases" , 
            "text": "Modifying the t-CS by replacing disease-free interval, number of metastases, and CEA level with RAS mutation status produced an m-CS that outperformed the t-CS. The m-CS is therefore a simple validated tool that predicts survival after resection of CLM.",
            "date":"2016.12.19",
            "url": "https://insights.ovid.com/crossref?an=00000658-900000000-96092"
        },
        {
            "title": "Laparoscopics versus open resection for colorectal liver metastases: the OSLO-COMET randomized trail",
            "text" : "In patients undergoing parenchyma-sparing liver resection for colorectal metastases, laparoscopic surgery was associated with significantly less postoperative complications compared to open surgery. Laparoscopic resection was cost-effective compared to open resection with a 67% probability. The rate of free resection margins was the same in both groups. Our results support the continued implementation of laparoscopic liver resection.",
            "date":"2017.05.10",
            "url": "https://insights.ovid.com/crossref?an=00000658-201802000-00001"
        },{
            "title": "Molecular signatures reflecting microenvironmental metabolism and chemotherapy-induced immunogenic cell death in colorectal liver metastases", 
            "text": "The uniform classification of CLM by CMS subtyping may indicate that novel class discovery approaches need to be explored to uncover clinically useful stratification of CLM. Detected gene expression signatures support the role of metabolism and chemotherapy in shaping the immune microenvironment of CLM. Furthermore, the results point to rational exploration of immune modulating strategies in CLM, particularly by exploiting NACT-induced ICD.",
            "date":"2018.05.10",
            "url": "http://www.oncotarget.com/index.php?journal=oncotarget&page=article&op=view&path[]=19350&path[]=61903"
        },{
            "title": "Systemic immune response induced by oxaliplatin-based neoadjuvant therapy favours survival without metastatic progression in high-risk rectal cancer", 
            "text": "In high-risk rectal cancer, oxaliplatin-containing neoadjuvant therapy may promote an immune response that favours survival without metastatic progression.",
            "date":"2017.12.10",
            "url":"https://www.nature.com/articles/s41416-018-0085-y"
        }

    ];

    var viewData = {
        ehr_id: ehrId,
        procedures: [],
        diagnosis: [], 
        articles: articles, 
        articleNumber: number(0, articles.length)
    }
    var example1 = new Vue({
        el: '#ehr',
        data: viewData, 
        methods:{
            getArticles: function(pCode){
                console.log("getArticle for " + pCode);
                if(pCode.startsWith("W")){
                    return [this.articles[0], this.articles[1]];
                }else if(pCode.startsWith("AB")){
                    return [this.articles[1], this.articles[2]];
                }else{
                    return [this.articles[3]];
                }
                
            }
        }
    })

    function updateRecommendations(data) {
        console.log(data);
        viewData.procedures = data.procedures;
        viewData.diagnosis = data.diagnosis;

    }
    loop(1000);

    function loop(ms) {
        setTimeout(function () {
            loadDataFromApi("ehrs/" + ehrId, updateRecommendations);
            loop(ms);
        }, ms);
    }
})();