import snmp from 'snmp-native';

class conv {
    constructor() {
        console.log('init');
        this.host = "10.65.101.234";
        this.community = 'public';

        this.sessions = [];



    }

    init() {
        console.log('init2');
    }

    setHost(s) {
        this.host = s;
    }

    getOID(oidStr) {
        // return an OID array

        return oidStr
            .split('.')
            .filter((s) => {
                return s.length > 0;
            })
            .map(function(s) {
                return parseInt(s, 10);
            });


    }

    openSession() {

        //console.log('Opening session');
        var s = new snmp.Session({
            host: this.host,
            community: this.community
        });

        return s;
    }

    closeSession() {
        //console.log('Close session');
        this.session.close();
    }

    getSingle(oidStr, callback) {

        var session = this.openSession();



        session.get({
            oid: this.getOID(oidStr)
        }, (err, varbinds) => {
            var vb;

            if (err) {
                console.log('Error = ', err);
            } else {


                //console.log(varbinds);


                session.close();
                if (callback) callback(varbinds);
                //console.log('The system description is' + vb.value);
            }
            //this.closeSession();
        });
    }




    getMulti(oidStr, callback) {

        var session = this.openSession();

        this.sessions.push(session);

        //this.session.get({oid:this.getOID(oidStr)},(err,varbinds)=>{
        session.getSubtree({
            oid: this.getOID(oidStr)
        }, (err, varbinds) => {
            var vb;

            if (err) {
                console.log('Error = ', err);
            } else {



                //console.log(varbinds);


                session.close();

                if (callback) callback(varbinds);
                //console.log('The system description is' + vb.value);
            }
            //this.closeSession();
        });
    }
}

export default new conv();
