


T.namespace("T.DP.projectname");
T.DP.projectname = function(){

	var msginit = function(){
		T.on('click',function(e){
			e.halt();
			YAHOO.CN.msg.alert('abc');
		},'#show-msg');

	};

	var yui2loadcalendar = function(){
		T.on('click',function(e){
			e.halt();
			var loader = new YAHOO.util.YUILoader({
				require: ['calendar'], 
				onSuccess: function() {
					var myCal = new YAHOO.widget.Calendar("mycal_id", "calendar_container");
					myCal.render();
				}
			});
			loader.insert();
		},'#load-calendar');

	};

	var yui3slider = function(){
		var v_report = T.get('#vert_value');
		var reportValue = function(e) {
			v_report.set('innerHTML', 'Value: ' + e.newVal);
		};
		new T.Slider({
			railSize: '200px',
			thumbImage: 'http://developer.yahoo.com/yui/3/examples/slider/assets/images/thumbX.png'
		}).
		render('.horiz_slider').
		after('valueChange',function (e) {
			T.get('#horiz_value').set('innerHTML', 'Value: ' + e.newVal);
		});
	};

	return {
		init : function(){
			//msg
			msginit();
			yui2loadcalendar();
			yui3slider();
		}
	};
}();

