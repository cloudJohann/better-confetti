
public with sharing class getObjectFields extends VisualEditor.DynamicPickList {

    VisualEditor.DesignTimePageContext context;

    public getObjectFields(VisualEditor.DesignTimePageContext context) {
        this.context = context;
        
    }

    public override VisualEditor.DataRow getDefaultValue() {

        VisualEditor.DataRow row = new VisualEditor.DataRow(null,null);
        
        return null;
    }

    public override VisualEditor.DynamicPickListRows getValues() {

        VisualEditor.DynamicPickListRows rows = new VisualEditor.DynamicPickListRows();

        Map<String,String> fields = getFields();
        for (String key : fields.keySet()) {
            VisualEditor.DataRow row = new VisualEditor.DataRow(fields.get(key), key);
            rows.addRow(row);
        }

        return rows;
    }

    private Map<String, String> getFields() {

        Map<String,String> fieldMap = new Map<String,String>();

        Map<String, Schema.SObjectField> describeResult = Schema.getGlobalDescribe().get(context.entityName).getDescribe().fields.getMap();

        for (String key : describeResult.keySet()) {
            DescribeFieldResult dfr = describeResult.get(key).getDescribe();
            Schema.DisplayType typeName = dfr.getType();
            
            if ((Schema.DisplayType.STRING == typeName || Schema.DisplayType.BOOLEAN == typeName || Schema.DisplayType.PICKLIST == typeName) && dfr.isAccessible()) {
                fieldMap.put(dfr.getName(), dfr.getLabel());
            }
        }

        return fieldMap;
    }


}