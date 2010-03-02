/**
 * tbrr.js | taobao�������
 * autohr:jay.li@alibaba-inc.com
 * @class T.tbwidget.tbrr
 * @param { object } ������
 * @return { object } ����һ������ʵ��
 * @requires { t-pagination,t-simpleditor,t-base,node,event } 
 * 
 * param:
 *		{ object }:
 *			commentListId	:�����б��id
 *			steplength		:ÿҳ��ʾ���۸���
 *			pageNo			:��ǰ������ʾ��ҳ��
 *			url				:ȡ���۵�url
 *			id				:���������id
 *			pageDivId		:��ҳ������ڵ�id
 *			addUrl			:�������۵Ľӿ�
 *			delUrl			:ɾ�����۽ӿ�
 *			islogin			:��ǰ�û��Ƿ��¼��true��false
 *			defaultxt		:�༭��Ĭ������
 *			nologinHtml		:δ��¼ʱ���༭��λ����ʾ��html str
 *			showReviewCount	:�������۸���������id
 *			skin			:skin��url
 *			
 * property:
 *		static:
 *		public:
 *			theCommentList:�����б����
 *			theCommentList.render:��Ⱦ����
 * interfaces:
 *		init:��ʼ��
 *		
 */
YUI.namespace('T.tbwidget.tbrr');
YUI.add('tbrr', function (Y) {
    T.tbwidget.tbrr = function () {
        var that = this;
        var args = arguments;
        var skin = (typeof arguments[0].skin == 'undefined') ? '' : arguments[0].skin;
        YUI({
            modules: {
                'tbrr-skin': {
                    fullpath: skin,
                    type: 'css'
                }
            }
        }).use('tbrr-skin', function (Y) {
            that.init.apply(that, args);
        });
    };
    T.tbwidget.tbrr.prototype = {
        commentList: function (cfg) {
            var steplength = this.steplength = cfg.steplength;
            var pageNo = this.pageNo = cfg.pageNo;
            var url = this.url = cfg.url;
            var commentListId = this.commentListId = cfg.commentListId;
            var pageDivId = this.pageDivId = cfg.pageDivId;
            var delUrl = this.delUrl = cfg.delUrl;
            var showReviewCount = this.showReviewCount = cfg.showReviewCount;
            var onDelSuccess = this.onDelSuccess = cfg.onDelSuccess;
            var that = this;
            this.loadingHtml = ['<div class="t-commentlist-loading">loading��������</div>'].join("");
            this.commentItemHtml = ['<div class="t-comment-item">', '<dl>', '<dt><span class="t-ci-img blue" rel="{$user_id}">{$user_name}</span><em class="time">{$review_time}</em>{$del_str}</dt>', '<dd>{$content}</dd>', '</dl>', '</div><!-- /item -->'].join('');
            this.showComments = function (o, login_user) {
                if (typeof o != 'object') {
                    var con = Y.Node.get('#' + this.commentListId);
                    con.set('innerHTML', this.loadingHtml);
                }
				//�ǵ�һҳֻ��һ�����۵�ʱ���ɾ���ɹ���ص�������ҳ
				if(typeof o != 'undefined' && /*T.base.getLength(o)*/ o.length == 1 && this.pageNo > 1){
					var del_ctl = 'ok';//��Ϊok��ɾ�������ӻص���һҳ
				}else{
					var del_ctl = '';//�������ڵ�ҳ
				}
                var a = [];
                //for (var i = 0;i<o.length;i++) {
				for (var i in o ) {
					if(typeof o[i] == 'function')continue;
                    if (o[i].user_id == login_user || login_user.toString() == '345708290') {
                        var str_in = '<span class="t-ci-reply"><a href="javascript:void(0);" class="J-ci-del" rev="' + del_ctl + '" rel="' + o[i].rr_id + '">ɾ��</a>';
                    } else {
                        var str_in = '';
                    }
                    try {
                        var con_str = decodeURIComponent(o[i].content);//��ȷ����
                    } catch(e) {//����ȷ����
                        var con_str = o[i].content;
                    }
                    con_str = T.base.wbtrim(con_str);
                    a.push({
                        rr_id: o[i].rr_id,
                        user_id: o[i].user_id,
                        user_name: o[i].user_name,
                        review_time: o[i].review_time,
                        content: con_str,//.replace(/\[face(\d+)\]/ig, '<img src="http://a.tbcdn.cn/sys/wangwang/smiley/24x24/$1.png" border=0 />'),
                        del_str: str_in
                    });
                }
                var html = T.base.templetShow(this.commentItemHtml, a);
                var con = Y.Node.get('#' + this.commentListId);
                con.set('innerHTML', html);
                con.queryAll('a.J-ci-del').on('click', function (e) {
                    e.halt();
                    var rr_id = e.target.getAttribute('rel');
                    var rr_ctl = e.target.getAttribute('rev');
                    if (window.confirm("ȷ��Ҫɾ������������?")) {
                        T.base.io('GET', that.delUrl + '&rr_id=' + rr_id, function (o) {
                            var p = (rr_ctl == 'ok') ? '1' : that.pageNo;
                            Y.log('pageNo:' + p);
                            that.onDelSuccess(p);
                        });
                    }
                });
            };
			/**
			 * @method render ��Ⱦ
			 * @memberof commentList
			 * @param { object }
			 * 		steplength	: number ÿҳ����������
			 *		pageNo		: number ��ʾ�ڼ�ҳ
			 *		url			: string �ӿ�
			 * ...		
			 */
            this.render = function (cfg) {
                var that = this;
                if (typeof cfg != 'undefined') {
                    if (typeof cfg.steplength != 'undefined') this.steplength = cfg.steplength;
                    if (typeof cfg.pageNo != 'undefined') this.pageNo = cfg.pageNo;
                    if (typeof cfg.url != 'undefined') this.url = cfg.url;
                    if (typeof cfg.commentListId != 'undefined') this.commentListId = cfg.commentListId;
                    if (typeof cfg.pageDivId != 'undefined') this.pageDivId = cfg.pageDivId;
                    if (typeof cfg.delUrl != 'undefined') this.delUrl = cfg.delUrl;
                    if (typeof cfg.showReviewCount != 'undefined') this.showReviewCount = cfg.showReviewCount;
                }
                var offset = (Number(this.pageNo) - 1) * Number(this.steplength);
                if (offset < 0) offset = 0;
                T.base.io('GET', url + '&limit=' + this.steplength + '&offset=' + offset.toString() + '&tt=' + Math.random(), function (o) {
                    Y.one('#' + that.showReviewCount).set('innerHTML', Number(o.review_count));
                    if (o.review.length == 0) {
                        Y.Node.get('#' + that.commentListId).set('innerHTML', '������������');
                        return;
                    }
                    that.showComments(o.review, o.login_user);
                    var rc = Number(o.review_count) == 0 ? 1 : Number(o.review_count);
                    if (rc % that.steplength == 0) var max = rc / that.steplength;
                    var max = (rc % that.steplength == 0) ? (rc / that.steplength) : Math.floor(rc / that.steplength + 1);
                    if (that.thePagination == null) {
                        that.thePagination = new T.tbwidget.pagination(Y.one('#' + pageDivId), {
                            index: pageNo,
                            max: max,
                            page: function (n) {
                                that.render({pageNo:n});
                            }
                        });
                    } else {
						that.thePagination.setpos(that.pageNo);
                        that.thePagination.setmax(max);
                    }
                });
                return this;
            };
        },
		/**
		 * @method init ��ʼ���������
		 */
        init: function (cfg) {
            var cfg = cfg || {};
            var commentListId = this.commentListId = typeof cfg.commentListId == 'undefined' ? 'J-comment-list' : cfg.commentListId;
            var steplength = this.steplength = typeof cfg.steplength == 'undefined' ? 5 : cfg.steplength;
            var pageNo = this.pageNo = typeof cfg.pageNo == 'undefined' ? 1 : cfg.pageNo;
            var url = this.url = typeof cfg.url == 'undefined' ? '/cnrr/test' : cfg.url;
            var id = this.id = typeof cfg.id == 'undefined' ? '' : cfg.id;
            var pageDivId = this.pageDivId = typeof cfg.pageDivId == 'undefined' ? '' : cfg.pageDivId;
            var delUrl = this.delUrl = typeof cfg.delUrl == 'undefined' ? '' : cfg.delUrl;
			var vCodeUrl = this.vCodeUrl = typeof cfg.vCodeUrl == 'undefined'?null:cfg.vCodeUrl;
            var addUrl = this.addUrl = typeof cfg.addUrl == 'undefined' ? '' : cfg.addUrl;
            var islogin = this.islogin = typeof cfg.islogin == 'undefined' ? '' : cfg.islogin;
            var defaultxt = this.defaultxt = typeof cfg.defaultxt == 'undefined' ? '' : cfg.defaultxt;
            var nologinHtml = this.nologinHtml = typeof cfg.nologinHtml == 'undefined' ? '' : cfg.nologinHtml;
            var showReviewCount = this.showReviewCount = typeof cfg.showReviewCount == 'undefined' ? 'J-review-count' : cfg.showReviewCount;
            that = this;
            this.theCommentList = new this.commentList({
                commentListId: commentListId,
                steplength: steplength,
                pageNo: pageNo,
                url: url,
                pageDivId: pageDivId,
                delUrl: delUrl,
                thePagination: null,
                showReviewCount: showReviewCount,
                onDelSuccess: function (pageNo) {
					this.render({pageNo:pageNo});
                }
            }).render();
            this.theditor = new T.tbwidget.simpleditor({
                id: 'J-theditor',
                addUrl: addUrl,
                islogin: islogin,
				vCodeUrl:vCodeUrl,
                defaultxt: defaultxt,
                nologinHtml: nologinHtml,
                onsubmit: function (postString) {
					that.theCommentList.render({pageNo:1});
					try{
						that.theCommentList.thePagination.setpos(1);
					}catch(e){}
                }
            });
        },
        theditor: null
    };
},
'', {
    requires: ['dump']
});
