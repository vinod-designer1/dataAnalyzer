/*
 * analyzer.dataset.js
 * Manages uploading dataset and parsing them
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global $, analyzer */

analyzer.dataset = (function() {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html : String()
        + '<div class="analyzer-dataset-head">'
          + '<button class="btn analyzer-dataset-add-btn">Add Dataset</button>'
        + '</div>'
        + '<div class="analyzer-dataset-main">'
        + '</div>'
        + '<div class="analyzer-dataset-modal">'
        + '</div>'
    },
    stateMap = {
      $container  : undefined,
      modal_elem  : {
        'dataset_name_id'    : '',
        'dataset_type_class' : '',
        'dataset_type_static_class' : '',
        'dataset_type_dynamic_class': '',
        'dataset_type_select_class': '',
      },
      col_first_row : true
    },
    jqueryMap = {},
    initModule, attachEvents, onClickAddDataset,
    onClickUploadData,
    setJqueryMap, fillDOM, getModalBody,
    onClickShowDataForm, fillModal;
  //----------------- END MODULE SCOPE VARIABLES ---------------

  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    jqueryMap = {
      $container : $container,
      $addBtn    : $container.find('.analyzer-dataset-add-btn'),
      $modal     : $container.find('.analyzer-dataset-modal')
    };
  };
  // End DOM method /setJqueryMap/

  // Begin DOM method /getModalBody/
  //
  getModalBody = function () {
    var modal_body_html = String()
                          + '<div class="form-group">'
                            + '<label for="datasetName" class="col-sm-2 control-label">Name</label>'
                            + '<div class="col-sm-10">'
                              + '<input type="text" class="form-control" id="datasetName" placeholder="Dataset Name">'
                            + '</div>'
                          + '</div>'
                          + '<div class="form-group">'
                            + '<label class="radio-inline">'
                              + '<input type="radio" class="dataset-type" name="datasetTypeRadio" value="static" checked>'
                              + 'File' 
                            + '</label>'
                            // + '<label class="radio-inline">'
                            //   + '<input type="radio" class="dataset-type" name="datasetTypeRadio" value="dynamic">'
                            //   + 'Url' 
                            // + '</label>'
                          + '</div>'
                          + '<div class="dataset-static dataset-input form-group">'
                            + '<label for="staticFile" class="col-sm-2 control-label">CSV File</label>'
                            + '<input type="file" id="staticFile">'
                          + '</div>';
                          // + '<div class="dataset-dynamic dataset-input form-group" style="display:none">'
                          //   + '<label for="datasetUrl" class="col-sm-2 control-label">Name</label>'
                          //   + '<div class="col-sm-10">'
                          //     + '<input type="text" class="form-control" id="datasetUrl" placeholder="Dataset URL">'
                          //   + '</div>'
                          // + '</div>';
    return modal_body_html;

  };
  // End DOM method /getModalBody/

  // Begin DOM method /fillModal/
  // 
  fillModal = function () {
    var modal_html = String()
                     + '<div class="modal fade" id="datasetLoader" tabindex="-1" role="dialog" aria-labelledby="datasetLoaderLabel" aria-hidden="true">'
                       + '<div class="modal-dialog">'
                         + '<div class="modal-content">'
                           + '<div class="modal-header">'
                             + '<button type="button" class="close" data-dismiss="modal">'
                               +'<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>'
                             + '</button>'
                             + '<h4 class="modal-title" id="datasetLoaderLabel">Dataset Uploader</h4>'
                           + '</div>'
                           + '<div class="modal-body">'
                             + getModalBody()
                           + '</div>'
                           + '<div class="modal-footer">'
                             + '<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>'
                             + '<button type="button" class="btn btn-primary analyzer-dataset-upload-btn">Upload</button>'
                           + '</div>'
                         + '</div>'
                       + '</div>'
                     + '</div>';

    jqueryMap.$modal.html(modal_html);

    jqueryMap.$modalUploadBtn  = jqueryMap.$modal.find('.analyzer-dataset-upload-btn');
    jqueryMap.$modalMain       = $('#datasetLoader');

    stateMap['modal_elem']['dataset_name_id'] = 'datasetName';
    stateMap['modal_elem']['dataset_type_class'] = 'dataset-input';
    stateMap['modal_elem']['dataset_type_static_class'] = 'dataset-static';
    stateMap['modal_elem']['dataset_type_dynamic_class'] = 'dataset-dynamic';
    stateMap['modal_elem']['dataset_type_select_class'] = 'dataset-type';
  };
  // End DOM method /fillModal/

  // Begin DOM method /fillDOM/
  // Purpose   : fill's additional dom elements needed for this functionality
  // 
  fillDOM = function () {
    fillModal();
  };
  // End DOM method /fillDOM/
  //--------------------- END DOM METHODS ----------------------

  //------------------- BEGIN EVENT HANDLERS -------------------
  // Begin Event handler /onClickAddDataset/
  // Purpose    : Adding datasets
  // Arguments  :
  //   * event - jQuery event object.
  // Settings   : none
  // Actions    :
  //   * Pop's up modal to upload dataset from url or direct document
  //
  onClickAddDataset = function ( event ) {
  	jqueryMap.$modalMain.modal();
  };
  // End Event handler /onClickAddDataset/

  // Begin Event handler /onClickShowDataForm/
  // Settings   : none
  // Actions    :
  //   * Shows type the form to upload data by datatype
  //
  onClickShowDataForm = function () {
  	var selected_type = $(this).val();
    console.log(selected_type);
  	jqueryMap.$modalMain.find('.' + stateMap['modal_elem']['dataset_type_class']).hide();
    jqueryMap.$modalMain.find('.' + stateMap['modal_elem']['dataset_type_' + selected_type + '_class']).show();
  };
  // End Event handler /onClickShowDataForm/

  // Begin Event handler /onClickUploadData/
  //
  onClickUploadData = function ( event ) {
    var selected_type = $('.' + stateMap['modal_elem']['dataset_type_select_class'] + ':checked').val();
    var $input = $('.' + stateMap['modal_elem']['dataset_type_' + selected_type + '_class'] + ' input');

    if ( selected_type === 'static')
    {
      var files = $input[0].files;
      // console.log($input);
      // console.log(files);
      var data = new FormData();
      $.each(files, function(i, file) {
          data.append('file-'+i, file);
      });
      data.append('dataFrom', 'static');
      data.append('colFirstRow', stateMap.col_first_row);
      //@TODO : need to move to analyzer request
      var options = {
        url:  '/dataset/create',
        type: 'POST',
        data: data,
        processData: false,
        contentType: false,
        dataType : 'json',
        success:function( data ) {
          jqueryMap.$modalMain.modal('hide');
          analyzer.dashboard.initModule(jqueryMap.$dashboard);
          analyzer.dashboard.loadData(data);
        }
      };
      console.log(options);
      $.ajax(options);
    } 
  };
  // End Event handler /onClickUploadData/
  //-------------------- END EVENT HANDLERS --------------------

  //-------------------- BEGIN UTILITY METHODS -----------------
  // Begin utility /attachEvents/
  //
  attachEvents = function () {
    jqueryMap.$addBtn.click(onClickAddDataset);
    jqueryMap.$modalUploadBtn.click(onClickUploadData);
    jqueryMap.$modalMain.find('.' + stateMap['modal_elem']['dataset_type_select_class']).click(onClickShowDataForm);
  };
  // End utility /attachEvents/
  //--------------------- END UTILITY METHODS ------------------

  //------------------- BEGIN PUBLIC METHODS -------------------
  // Begin Public method /initModule/
  // Example   : analyzer.dataset.initModule( $('#app_div_id') , $('#app_dashboard_id'));
  // Purpose   :
  //   Directs the Shell to offer its capability to the user
  // Arguments :
  //   * $container (example: $('#app_div_id')).
  //     A jQuery collection that should represent 
  //     a single DOM container
  // Returns   : none 
  // Throws    : none
  //
  initModule = function ( $sidebar, $dashboard ) {
    // load HTML and map jQuery collections
    stateMap.$container = $sidebar;
    $sidebar.html( configMap.main_html );
    setJqueryMap();
    jqueryMap.$dashboard = $dashboard;
    fillDOM();

    attachEvents();

  };
  // End PUBLIC method /initModule/
  return { initModule : initModule };
  //------------------- END PUBLIC METHODS ---------------------
}());