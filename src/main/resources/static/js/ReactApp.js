var host=window.location.href;


var MyClock = React.createClass({
      getInitialState:function(){
		  return({date:new Date()});
	  },	
	   
	   render(){
		  return(
			<span id="clocksp">
		   <p><strong id="country">India</strong><br></br>
		   <strong>{this.state.date.toDateString()}<br></br>
		   {this.state.date.toLocaleTimeString()}</strong></p>
			</span>
		   );
	   },
	   
	   componentDidMount(){
		   this.timerId = setInterval(
		   ()=>this.tick(),
		   1000
		   );
	   },
	   
	   componentWillUnMount(){
		   clearInterval(this.timerId);
	   },
	   
	   tick(){
		   this.setState({
			   date:new Date()
		   });
	   }

});


var LineBreak = React.createClass({
	render:function(){
	var check=this.props.line;
	if(check.length > 8){
		var line1 = check.substr(0,8);
		var line2 = check.substr(8,7);
		return(<div>{line1}<br></br>{line2}</div>);
	}else{
		return(<div>{check}</div>);
	}
	}
});

	var Topics = React.createClass({
	getInitialState:function(){
		return({display:true});
	},

	handleDelete(){
		var confdelete = confirm('Are you sure want to delete ?');
		if(confdelete)
		{
        var self=this;
		$.ajax({
             url:host+"api/topics/"+self.props.topic.id,
             type:"DELETE",
              success:function(result){
				//console.log(url);
				self.setState({display:false});
				location.reload();
			  },
			  error:function(xhr,ajaxOptions,thrownError){
				toastr.error(xhr.responseJSON.message);
				}
			});
  		console.log(this.props.topic.id);
		}
    },

  render: function() {
    if(this.state.display===false)
    return null;
    else{
		 var opt = document.createElement('option');
		 opt.innerHTML=this.props.topic.id;
		 $('select').append(opt);
    return (<tr>
        <td>{this.props.topic.id}</td>
        <td><LineBreak line={this.props.topic.name}/></td>
        <td><LineBreak line={this.props.topic.description}/></td>
		<td><button className="btn btn-info" onClick={this.handleDelete}>Delete</button></td>
      </tr>);
	}
  }
});

	var TopicTable = React.createClass({
		render:function(){
			var rows=[];
			this.props.topics.forEach(function(topic){
				rows.push(<Topics topic={topic} />)
			});
			if(rows.length > 0)
			return(
			<div>
			<table>
				<thead>
				<tr><th>ID</th><th>Name</th><th>Description</th><th>Delete</th></tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
			</div>
			);
			else
				return null;
		}
	});
	
	
	
	var SubmitDetails = React.createClass({
		
		inputChange(event){
			var invalue=event.target.value;
			var regular = new RegExp("^(?!$)(?:[a-zA-Z0-9]*[a-zA-Z0-9]*)?$");
			if (!regular.test(invalue)) 
			{ 
				$('#Msg').html('<strong>Only alphanumeric and no spaces is allowed</strong>');
				$('#Msg').fadeIn(1000); 
				$('#Msg').fadeOut(1000); 
			}
		},
		
		handleSubmit(event){
			var regularexp = new RegExp("^(?!$)(?:[a-zA-Z0-9]*[a-zA-Z0-9]*)?$");
			var id = $('#idT').val(); var name=$('#idN').val();
			if(id!=='' && name!==''){
			if(regularexp.test(id) && regularexp.test(name))
			{
			var formsub = confirm('Do you want to submit the details ?');
			if(formsub){
			var formData ={
				"id":$('#idT').val(),
				"name":$('#idN').val(),
				"description":$('#idD').val()
			};
			
			var jsonString=JSON.stringify(formData);
			
			$.ajax({
				 url:host+"api/topics",
				 type:'POST',
				 contentType:'application/json',
				 data:jsonString,
				 success:function(){
					 $("[type='text']").val('');
					 alert('Data Submitted successfully.');
					location.reload();
				 },
				 error:function(xhr,ajaxOptions,thrownError){
					toastr.error(xhr.responseJSON.message);
				}
				
			});
			}
			}else{
				alert('Only alphanumeric and no spaces are allowed');
			}
			}else{
				alert('Please fill all the required fields');
			}
			
		},
		
		handleChange(event){
			$('#checkId').hide();
			console.log($('h5').text());
			var ids = event.target.value;
			if(ids!=='--Select--')
			{
			$('#idT').val(ids);
			$('#idT').prop('disabled',true);
			$.ajax({
				url:host+'api/topics/'+ids,
				type:'GET',
				success:function(data){
					console.log(data);
					$('#idN').val(data.name);
					$('#idD').val(data.description);
					$("#sub").hide(500);
					$("#upd").show(500);
					$('h5').html('<strong><u>Update topic details:</u></strong>');
				}
			});
			}else{
				console.log(ids);
				$('#idN').val(null);
				$('#idD').val(null);
				$('#idT').prop('disabled',false);
				$('#idT').val(null);
				$("#sub").prop('disabled',false);
				$("#sub").show(500);
				$("#upd").hide(500);
				$('h5').html('<strong><u>Add topic details:</u></strong>');
			}
		},
		
		handleUpdate(){
			var regexpupd = new RegExp("^(?!$)(?:[a-zA-Z0-9]*[a-zA-Z0-9]*)?$");
			var nameupd=$('#idN').val();
			if(nameupd!==''){
				if(regexpupd.test(nameupd))
				{
			    if($('#idT').prop('disabled')===true)
				{
				var formupd = confirm('Do you want to update the details ?');
				if(formupd){
				var jsond = {
					"id":$('#idT').val(),
					"name":$('#idN').val(),
					"description":$('#idD').val()
				};
				var finjson = JSON.stringify(jsond);
				
				$.ajax({
					 url:host+'api/topics/'+$('#idT').val(),
					 type:'PUT',
					 contentType:'application/json',
					 data:finjson,
					 success:function(){
						 alert('Data Updated Successfully.'),
						 location.reload();
					 },
					 error:function(xhr,ajaxOptions,thrownError){
						toastr.error(xhr.responseJSON.message);
						}
				});
				}
				}else{
					alert('Select Id from dropdown to update');
				}
				}else{
					alert('Only alphanumeric and no space is allowed.');
				}
			}else{
				alert('Please fill the required field');
			}
		},
		
		render(){
			return(
			<div>
			<label id="lselec" className="LeftApp"><strong className="txtwhit">Select Id to update:</strong>&nbsp;
				<select onChange={this.handleChange}>
				<option >--Select--</option>
				</select>
			</label>
			<br></br>
			<div id="form">
					<div><h5><strong><u>Add Topic Details:</u></strong></h5></div>
					<div id="Msg"></div>
					<div>
					<label htmlFor="idT">TopicId:&nbsp;<abbr>*</abbr>&nbsp;
					<input id="idT" type="text" name="nT" onChange={this.inputChange}/>
					</label>
					</div>
					<div id="checkId"></div>
					<div>
					<label htmlFor="idN">Name:&nbsp;<abbr>*</abbr>&nbsp;
					<input id="idN" type="text" name="nN" onChange={this.inputChange}/>
					</label>
					</div>
					<div>
					<label htmlFor="idD">Description:&nbsp;
					<input id="idD" type="text" name="nD" maxlength="20"/>
					</label>
					</div>
					<div className="button">
					<button  id="sub" onClick={this.handleSubmit}><strong>Submit</strong></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<button  id="upd" onClick={this.handleUpdate}>Update</button>
					</div>
				</div>
			</div>
			
			);
		}
	});
	
	var App = React.createClass({
		
		loadTopicsFromServer: function(){
			var self=this;
			$.ajax({
				url:host+"api/topics",
			}).then(function(data){
				console.log(host);
				self.setState({topics: data});
			});
		},
		
		getInitialState: function(){
			return {topics:[]};
		},
		
		componentDidMount:function(){
			this.loadTopicsFromServer();
		},
		
		render(){
			var tempTopic = this.state.topics;
			
			function CheckValidId(){
					
					var checkflag=0;
					for(var topicId of tempTopic){
						if(topicId.id===$('[name="nT"]').val())
							checkflag=1;
					}
					if(checkflag===0 && $('[name="nT"]').val()!=='')
					{
						$('#sub').slideDown();
						$('#checkId').html('<strong>Id can be used</strong>').css('color','green');$('#checkId').show();
					}
					if(checkflag===1 && $('[name="nT"]').val()!=='')
					{
						$('#sub').slideUp();
						$('#checkId').html('<strong>Id cannot be used</strong>').css('color','red');$('#checkId').show();
					}
					if($('[name="nT"]').val()==='') $('#checkId').hide();
				}
			
			$(document).ready(function(){
				$('[name="nT"]').attr('maxlength',4);
				$('[name="nN"]').attr('maxlength',15);
				$('[name="nD"]').attr('maxlength',15);
				
				$("#Main").click(function(){
				$('video').trigger('play');
				});
					
				$('[name="nT"]').keyup(function(e){
					CheckValidId();
					if(e.target.value.length===4){
						$('[name="nN"]').focus();
					}
				});
				
				$('[name="nN"]').keyup(function(e){
					if(e.target.value.length===15){
						$('[name="nD"]').focus();
					}
				});
			});
			return(
			<div>
			<header>	
						<div id="headf">		
						<h1 className="App-title"><strong>Welcome to React</strong></h1>
						<img id="logo" src="../images/logo.svg" className="App-logo" alt="logo" />
						</div>
							<img id="office" src="../images/office.jpg" alt="Class room logo" />
							<img id="classroom" src="../images/classroom.jpg" alt="Office logo" />
							<img id="office1" src="../images/office1.jpg" alt="Office logo" />
					<MyClock />
			</header>
			<main>
			<div id="main" className="backImg">
				<div><SubmitDetails /></div>
				<div id="emptab"><TopicTable topics={this.state.topics}/></div>
				<div id="Main">
				<video width="390" height="390" poster="../images/poster.jpg">
					<source src="videos/iron-man_suite.mp4" type="video/mp4"/>
				</video>
				</div>
			</div>
			</main>
			<br></br>
			<footer>
			<div id="footf">
			<h1 className="App-title"><strong>Welcome to Spring</strong></h1>
			<img id="spring" src="../images/spring.png" className="SApp-logo" alt="spring logo" />
			</div>
				<img id="sunrise" src="../images/sunrise.jpg" alt="Sunrise logo" />
				<img id="classroom1" src="../images/classroom1.jpg" alt="Classroom1 logo" />
				<img id="learning"  src="../images/learning.jpg" alt="Learning logo" />
				<img id="abacus"  src="../images/abacus.jpg" alt="Abacus logo" />
			<span className="colorP">
				<a href="https://www.facebook.com" title="Facebook" target="_blank"><img id="face" src="../images/facebook.svg" alt="facebook" /></a>
				<a href="https://www.linkedin.com" title="Linkedin" target="_blank"><img id="linkedin" src="../images/linkedin.png" alt="linkedin" /></a>
				<a href="https://www.twitter.com" title="Twitter" target="_blank"><img id="twitter" src="../images/twitter.svg" alt="linkedin" /></a>
				<img id="license" src="../images/License.png" alt="license" />
			</span>
			</footer>
			</div>
			);
		}
	});

	ReactDOM.render(
	<App />,document.getElementById('root')
	);