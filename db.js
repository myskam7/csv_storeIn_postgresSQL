const  fs = require('fs'), 
        pg = require('pg'),
        csv = require('fast-csv');

const client = new pg.Client(process.env.DATABASE_URL);

client.connect((err => console.log(err))
  
);

let counter = 0; 

let csvStream = csv.fromPath('./csv/FL_insurance_sample.csv', {headers: true,  ignoreEmpty: true })
    .on('data', (record) => {
        csvStream.pause();



        if(counter < 1){
            let policyID = record.policyID;
            let statecode = record.statecode;
            let county = record.county;
            let eq_site_limit = record.eq_site_limit;
            let hu_site_limit = record.hu_site_limit;
            let fl_site_limit = record.fl_site_limitfr_site_limit;
            let fr_site_limit = record.fr_site_limit;
            let tiv_2011 = record.tiv_2011;
            let tiv_2012 = record.tiv_2012;
            let eq_site_deductible = record.eq_site_deductible;
            let  hu_site_deductible= record.hu_site_deductible;
            let fl_site_deductible = record.fl_site_deductible;
            let fr_site_deductible = record.fr_site_deductible;
            let point_latitude = record.point_latitude;
            let point_longitude = record.point_longitude;
            let line = record.line;
            let construction = record.construction;
            let point_granularity = record.point_granularity;
        

        client.query(`INSERT INTO csv_insurance (policyid, statecode, county, 
             point_latitude, point_longitude, line, construction) 
             VALUES ($1, $2, $3, $4, $5, $6, $7);`,[policyID, statecode, county, point_latitude, point_longitude, line, construction], (result, err) => {
                     if(err) {
                         console.log(err);
                     }
                     console.log(result);
                 });
                 ++counter;

                };

                csvStream.resume();
                }).on('end', () => {
                    console.log('done reading csv file');
                }).on('error', () => {
                    console.log(err);
                });



const getProducts = (cb) => {
    
    client.query('select * from csv_insurance')
    .then(result => cb(null, result.rows))
    .catch(err => cb(err));
  
}




module.exports = {
    csvStream, 
    getProducts
};