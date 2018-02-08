var controller = require('../main/functionalAPI.js');

module.exports = function(app){
    /* Base Route for API */
    app.route('/').get(controller.root);

    /*Service endpoints for Restaurant*/    
    app.get('/restaurants', controller.fetchRestaurants);
    app.get('/restaurant/:ID', controller.fetchRestaurant);
    app.post('/restaurant/add',  controller.addRestaurant);
    app.delete('/restaurant/delete/:ID', controller.deleteRestaurant);

    /*Service endpoints for Menu*/    
    app.get('/menus/:ID', controller.fetchRestaurantmenu);
    app.post('/menus/add', controller.addMenu);
    app.delete('/menus/delete/:RID&:MENU', controller.deleteMenu);
    
    /*Service endpoints for Menu_items*/    
    app.get('/menuitems/:RID', controller.fetchMenuItems);
    app.post('/menuitems/add', controller.addMenuItem);
    app.post('/menuitems/delete', controller.deleteMenuItem);
}