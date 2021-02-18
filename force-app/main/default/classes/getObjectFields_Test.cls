@isTest
private class getObjectFields_Test {
    
    @isTest static void getContactFieldPositiveTest() {
        VisualEditor.DesignTimePageContext context = new VisualEditor.DesignTimePageContext();
        context.entityName = 'Contact';
        context.pageType = 'RecordPage';
        getObjectFields gof = new getObjectFields(context);
        System.assert(gof.getValues().size()>0,'Get object fields should return rows');
        system.debug(gof.getDefaultValue());
        System.assert(gof.getDefaultValue() == null,'Get default should return null');




    }
}
