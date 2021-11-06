
//Without Sharing to ensure every user can get their own messages but not see other peoples messages
public with sharing class FabulousMessagesController {

    @AuraEnabled(cacheable=false)
    public static List<Fabulous_Confetti_Message__c> getnewMessagesForUser(String userId) {

        //Querry Fabulous Confetti Messages
        List<Fabulous_Confetti_Message__c> myFabulousMessages = new List<Fabulous_Confetti_Message__c>();
        try{
            myFabulousMessages = [SELECT Id, Confetti_Type__c, Target_User_Id__c, Message_Text__c FROM Fabulous_Confetti_Message__c WHERE Target_User_Id__c =: userId WITH SECURITY_ENFORCED];
        }catch(Exception e){
            return myFabulousMessages;
        }
        if(myFabulousMessages.size()>0){
            List<Fabulous_Confetti_Message__c> messagesToDelete = myFabulousMessages.clone();
            delete(messagesToDelete);
        }
        return myFabulousMessages;

    }
}
