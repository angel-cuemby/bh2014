/********************************************************************************************/
/********************************************************************************************/
/*******************************       IPHONE 4 (RETINA)       ******************************/
/********************************************************************************************/
/********************************************************************************************/

var components = {
	items : {
		basic : {
			title :'Basic',
			items : [ prx.components.text, prx.components.richtext,
					prx.components.rectangle, prx.components.circle, prx.components.horizontalline,
					prx.components.verticalline, prx.components.actionarea, prx.components.animationtarget,
					prx.components.image, prx.components.icon, prx.components.placeholder, prx.components.webview,
					prx.components.html, prx.components.audio, prx.components.video,
					prx.components.tooltip
			/*
			 * prx.components.websiteembed, prx.components.htmlcode,
			 * prx.components.maps prx.components.paragraph,
			 */
			]
		},

		toolbars : {
			title :'Toolbars',
			items : [ 
			          prx.components.toolbar,
			          prx.components.header,
			          //prx.components.footer,
			          // prx.components.navbar,
			          prx.components.basic_tabbar,
			          prx.components.tabbar ]
		},
		buttons : {
			title :'Buttons',
			items : [ prx.components.button2, 
			          prx.components.arrowbutton, 
			          prx.components.fullwidthbutton,
			          prx.components.buttongroup,
			          prx.components.segmentedcontrolplain,
			          prx.components.segmentedcontrol,
			          prx.components.segmentedcontrolbar,
			          prx.components.segmentedcontrolbezeled,
			          prx.components.pagecontroller 
			          ]
		},
		forms : {
			title :'Forms',
			items : [ prx.components.label, prx.components.textfield,
					prx.components.passwordfield, prx.components.radiobutton,
					prx.components.radiolist,
					prx.components.horizontalradiolist,
					prx.components.checkbox, prx.components.checkboxlist,
					prx.components.horizontalcheckboxlist,
					//prx.components.generic_onoffswitch,
					prx.components.flipswitch,
					prx.components.flipswitch_ios5,
					prx.components.textarea,
					prx.components.slider,
					prx.components.picker,
			/*
			 * prx.components.searchinput, prx.components.selectmenusingle,
			 * prx.components.selectmenugrouped,
			 * prx.components.selectmenuoverlaysmall,
			 * prx.components.selectmenuoverlarylarge,
			 * prx.components.selectmenuoverlaynative
			 */
			]
		},
		lists : {
			title :'Lists',
			items : [ prx.components.listbasic, prx.components.listnested,
					prx.components.listwithicon, prx.components.listwithvalue,
					prx.components.listnestedwithvalue,
					prx.components.listwithiconandvalue,
					prx.components.listwithbadge,
					prx.components.listnestedwithbadge,
					prx.components.listwithiconandbadge,
					prx.components.listcomplex
			/*
			 * prx.components.listnumbered, prx.components.listreadonly,
			 * prx.components.listsplitbutton, prx.components.listdivider,
			 * prx.components.listcountbubble, prx.components.listthumbnails,
			 * prx.components.listicons
			 */
			]
		},
		device : {
			title :'Other',
			items : [
					// prx.components.select,
					prx.components.popover,
					prx.components.alert, prx.components.actionsheet,
					prx.components.progressview
			/*
			 * prx.components.topbar, prx.components.datepicker,
			 * prx.components.timepicker, prx.components.keyboard,
			 * prx.components.decision, prx.components.overlay,
			 * prx.components.loaders
			 */
			]
		}
	},
	otherProperties :'insert here'
};
