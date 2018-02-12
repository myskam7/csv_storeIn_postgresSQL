const  fs = require('fs'), 
        pg = require('pg'),
        csv = require('fast-csv');

const client = new pg.Client(process.env.DATABASE_URL);

client.connect((err)
  .catch(err => console.log(err))
);

let csvStream = csv.fromPath('./csv/FL_insurance_sample.csv', {headers: true })
    .on('data', (record) => {
        csvStream.pause();

        if(record){
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
        

        client.query(`INSERT INTO fl_insurance (policyID, statecode, county, eq_site_limit, hu_site_limit, fl_site_limit,
             fr_site_limit, tiv_2011, tiv_2012, eq_site_deductible, hu_site_deductible, fl_site_deductible, fr_site_deductible, 
             point_latitude, point_longitude, line, construction, point_granularity) 
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18`, [policyID, statecode, county, eq_site_limit,
                 hu_site_limit, fl_site_limit, fr_site_limit, tiv_2011, tiv_2012, eq_site_deductible, hu_site_deductible, 
                 fl_site_deductible, fr_site_deductible, point_latitude, point_longitude, line, construction, point_granularity], (err, res) => {
                     if(err) {
                         console.log(err);
                     }
                 })

                };

                csvStream.resume();
                }).on('end', () => {
                    console.log('done reading csv file');
                }).on('error', () => {
                    console.log(err);
                });


