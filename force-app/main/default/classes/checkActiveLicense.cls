public with sharing class checkActiveLicense {


    //Empty class, if licences expired or suspended access will fail and component will not fire confetti
    @AuraEnabled(cacheable=true)
    public static Boolean currentUserActiveLicense(){

        return null;
    }


}
