@isTest
private class checkActiveLicense_Test {
    
    @isTest static void emptyTest() {
        //check if class and method exists
        System.assertEquals(null, checkActiveLicense.currentUserActiveLicense());

    }
}
