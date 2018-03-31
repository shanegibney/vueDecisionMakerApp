<style scoped>

h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    /* display: inline-block; */
    margin: 0 10px;
    text-align: left;
}

a {
    color: #42b983;
}

.noNewLine {
    /* display: inline; */
}


/* div {border: 2px solid black;} */

.slider {
    width: 100px !important;
}

</style>

<template>

<div>
    <div class="users">
        <div class="row">
            <div class="col-md-12">
                <!-- <h1>Decision Maker</h1>
                <h1>DecisionMaker</h1>
                <h1>Decision-Maker</h1> -->
                <h1>decisionMaker</h1>
                <!-- <h1>DECISIONMAKER</h1>
                <h1>DECISION-MAKER</h1> -->




            </div>
        </div>
        <div class="row" v-if="!decisionMade">
            <div class="col-md-1">
            </div>
            <div class="col-md-10">
                <!-- <form v-on:submit="addConsideration"> -->
                <!-- <form v-if="!decisionMade"> -->
                <form>
                    <span>Decision to be made:</span>
                    <input type="text" v-model="decision" placeholder="Should I do something?" required autofocus>
                    <br/>
                    <br/>
                    <input type="submit" value="Submit consideration" v-on:click="addDecision" class="btn btn-info">
                </form>
                <br/>
                <br/>
                <!-- <input v-if="!decisionMade" type="submit" value="Submit Decision" class="btn btn-info"> -->
                <!-- </form> -->
                <!-- <form v-if="!decisionMade" v-on:submit="addConsideration"> -->
                <!-- <hr>Add consideration: -->
                <!-- <input type="text" v-model="newInfo.consideration" placeholder="consideration" required>
                    <label for="weighting">Weighting: </label>
                    <input type="range" id="weighting" min="1" max="10" v-model="newInfo.weighting"> {{ newInfo.weighting }} -->
                <!-- <br />
                <br />
                <label for="pro">Pro: </label>
                <input type="radio" id="pro" value="one" v-model="newInfo.option">
                <label for="con">Con: </label>
                <input type="radio" id="con" value="two" v-model="newInfo.option"> -->
                <!-- Pro: <input type="radio" v-model="newUser.email" placeholder="enter email">
          Con: <input type="radio" v-model="newUser.email" placeholder="enter email"> -->
                <br />
                <br />
                <!-- <input type="submit" value="Submit consideration" class="btn btn-info">
                </form> -->
            </div>
            <div class="col-md-1">
            </div>
        </div>
        <div class="row">
            <div class="col-md-1">
            </div>
            <div class="col-md-10">
                <span v-b-tooltip.hover title="Edit question" v-if="decisionMade && !editQuestion" v-on:click="editDecision"><h2>{{ decision }}</h2><i class="far fa-edit fa-lg"></i></span>
                <form v-on:submit="editDecision">
                    <input v-if="decisionMade && editQuestion" type="text" v-model="decision">
                    <input v-if="editQuestion" type="submit" value="Update" class="btn btn-info">
                </form>
                <hr>
            </div>
            <div class="col-md-1">
            </div>
        </div>
        <div class="row" v-if="decisionMade">
            <div class="col-md-1">
            </div>
            <div class="col-md-5">
                <h5>PROs: considerations for decision</h5>
                <!-- <hr/> -->
                <form v-on:submit="addConsiderationPRO">
                    <input type="text" v-model="newInfo.consideration1" placeholder="consideration" required autofocus>

                    <!-- <label for="weighting">Weighting: </label> -->
                    <!-- <input type="range" id="weighting" min="1" max="10" v-model="newInfo.weighting"> {{ newInfo.weighting }} -->
                    <input type="submit" value="Add" class="btn btn-info">
                    <button type="button" class="bnt btn-info" v-on:click="orderInfo">Order by weighting</button>
                </form>
                <hr/>
                <ol>
                    <li v-for="(item, index) in info" v-if="item.option==='one'">
                        <div class="row">
                            <div class="col-md-7" style="width: 50%; margin: 0 auto; text-align: left">
                                {{ item.consideration }}
                            </div>
                            <div class="col-md-5" style="width: 50%; margin: 0 auto; text-align: left">
                                <input class="slider" type="range" id="weighting" min="1" max="10" v-model="item.weighting" tv-b-tooltip.hover title="Weighting"> {{ item.weighting }}
                                <!-- </div>
                              <div class="col-md-2"> -->
                                <span v-b-tooltip.hover title="Delete" v-on:click="deleteConsideration(item)"><i class="fas fa-times fa-sm"></i></span>
                                <span v-b-tooltip.hover title="Edit" v-on:click="editConsideration(index)"><i class="far fa-edit fa-sm"></i></span>
                                <span v-b-tooltip.hover title="Move to CONs" v-on:click="toggleColumn(index)"><i class="fas fa-arrow-right fa-sm"></i></span>
                            </div>
                        </div>
                    </li>
                </ol>
            </div>
            <div class="col-md-5">
                <h5>CONs: considerations against decision</h5>
                <!-- <hr/> -->
                <form v-on:submit="addConsiderationCON">
                    <input type="text" v-model="newInfo.consideration2" placeholder="consideration" required autfocus>
                    <!-- <label for="weighting">Weighting: </label> -->
                    <!-- <input type="range" id="weighting" min="1" max="10" v-model="newInfo.weighting"> {{ newInfo.weighting }} -->
                    <input type="submit" value="Add" class="btn btn-info">
                    <button type="button" class="bnt btn-info" v-on:click="orderInfo">Order by weighting</button>
                </form>
                <hr/>
                <ol>
                    <li v-for="(item, index) in info" v-if="item.option==='two'">
                        <div class="row">
                            <div class="col-md-7" style="width: 50%; margin: 0 auto; text-align: left">
                                <span v-if="!edit">{{ item.consideration }}
                                </span>
                                <span>
                                  <input v-if="edit" type="text" v-model="item.consideration">
                                </span>
                            </div>
                            <div class="col-md-5" style="width: 50%; margin: 0 auto; text-align: left">
                                <input class="slider" type="range" id="weighting" min="1" max="10" v-model="item.weighting" v-b-tooltip.hover title="Weighting"> {{ item.weighting }}
                                <span v-b-tooltip.hover title="delete" v-on:click="deleteConsideration(index)"><i class="fas fa-times fa-sm"></i></span>
                                <span v-b-tooltip.hover title="Edit" v-on:click="editConsideration(index)"><i class="far fa-edit fa-sm"></i></span>
                                <span v-b-tooltip.hover title="Move to PROs" v-on:click="toggleColumn(index)"><i class="fas fa-arrow-left fa-sm"></i></span>
                            </div>
                        </div>
                    </li>
                </ol>
            </div>
            <div class="col-md-1">
            </div>
        </div>
        <div class="row" v-if="info[0]">
            <div class="col-md-1">
            </div>
            <div class="col-md-10">
                <hr/>
                <!-- <h3>{{ outcome }} <br/>{{ normalisedResult *10}} {{ outcome2}}</h3>-->
                <h3>{{ outcome }} <br/>{{ percentage *10}}%<span v-if="percentage != 0">{{ outcome2}}</span></h3>

                <br/>
                <br/>
            </div>
            <div class="col-md-1">
            </div>
        </div>
        <!-- <div class="row" v-if="info[0]">
            <div class="col-md-2">
            </div>
            <div class="col-md-8">
                <button type="button" class="btn btn-info" v-on:click="makeDecision">Calculate Decision</button>
            </div>
            <div class="col-md-2">
            </div>
        </div> -->
        <div class="row">
            <div class="col-md-6">
              <h3>To do:</h3>
                <ol>
                  <li>Use downloaded bootstrap instead of CDN</li>
                    <li>Delete button needs is deleting items incorrectly</li>
                    <li>Edit should only highlight one item
                    </li>
                    <li>add Matt's options to worded outputs</li>
                    <li>button to order by weighting, not when mouseup from slider
                    </li>
                    <li>edit question
                    </li>
                    <li>a large slider or similar to indicate where output is between -10 and +10
                    </li>
                    <li>Uses need to know 0-10 is strength of each cons or pros
                    </li>
                    <li>possible categories to think inside e.g. financail cost, human factor, health, effect on family life etc...
                    </li>
                    <li>possibly get terms to disdplay in a pistogram such as wordey
                    </li>
                    <li>when first navigating to localhost in browser, after submitting question it refreshes to a blank input - correct this
                    </li>
                    <li>Move considerations up or down. No down arrow on last considerationa and no up arrow on first consideration
                    </li>
                    <li>visible change needed on edit, delete move etc buttons to show interaction with them
                    </li>
                    <li>edit question tooltip should be on edit button only not whole of the span
                    </li>
                    <li>decision edit button not behaving correctly
                    </li>
                    <li>Order by weighting should only apply to pros or cons not to both as it does now</li>
                    <li>Order by weighting should only appear when there is more than one consideration</li>
                    <li>use font-awesome not as a cdn, import it into the vue.cli properly</li>
                    <li>Bootstrao navbar for about us, contact, disclaimer</li>
                    <li>Calculate decision button on bottom instead of automatic calculation</li>
                    <li>add copyright</li>
                    <li>Drag & drop decision up, down or to other side https://github.com/SortableJS/Vue.Draggable</li>
                    <li>prevent things jumping when toggling between input to edit</li>
                    <li>use smooth transitions for everything</li>
                    <li>Add a disclaimer, not to be used for life and death decisions. This software is provided as is and the makers and owners of this software bare no responsibility for how it is used.</li>
                    <li>All users of this software are responsibile for their own actions and the result or output of this software is intended as a guide in decision making, but users must use their own common sense and take responsibiloty for their own actions.</li>
                    <li>Perhaps a checkbox needs to be ticked saying that you agree with the terms and conditions of use, which are that this software is to be used at your own risk and that the owners of this site bare no responsibility for actions taken as a result of the output of this software.</li>
                    <li>An alert whenever anyone uses specific words such as death, suicide or killing etc. reminding them that this software should not be used to make life or death decisionsAnd removing that word from the decsion, pro or con. If the user is a registered user, their account should be flagged for the admin.</li>
                    <li>Nabvigation bar: Features (of this software), How to Use, Forum link</li>
                    <li>Add a forum for registered users. Add Discourse/Disqus forum.</li>
                    <li>Add pie chart to share cons and pros, basically all the values for each side added up with their weighting or maybe just raw values. Think about this.</li>
                    <li>Add bar chart with axis horizontally centred, showing pros against cons for a little more visualisation.</li>
                </ol>
            </div>
        </div>
    </div>
</div>

</template>

<script>

export default {
    name: 'decision',
    data() {
        return {
            decisionMade: false,
            editQuestion: false,
            decision: '',
            newInfo: {
                consideration: '',
                option: 'one',
                weighting: 5
            },
            info: [],
            result: 0,
            normalisedResult: 0,
            outcome: '',
            percentage: 0,
            outcome2: '',
            edit: false,
            tmp: 0
        }
    },
    methods: {
        editDecision: function() {
            console.log("editing decision");
            if (this.editQuestion == true) {
                this.editQuestion = false;
            } else {
                this.editQuestion = true;
            };
            console.log("decision: " + this.decision);
            console.log("length: " + this.decision.length);
            console.log("last character: " + this.decision[this.decision.length - 1]);

            // if (this.decision[this.decision.length - 1] == "?") { //shouldn't need to check, last element should always be a "?" character
            // this.tmp = this.decision.length - 1;
            this.decision.splice(2, 1); //remove last element which is always a "?" character
            // }
            // add ? on end here also
            console.log("i am inside");
            this.decision = this.decision + "?";
        },
        addDecision: function(e) {
         this.decisionMade = true;
            //add '?' to question if needed
            if (this.decision[this.decision.length - 1] != "?") {
                this.decision = this.decision + "?";
            }
        },
        deleteConsideration: function(user) {
            // console.log("user: " + user.name + " index: " + this.users.indexOf(user));
            this.info.splice(this.info.indexOf(user), 1);
        },
        addConsiderationPRO: function(e) {
            // console.log('added');
            this.info.push({
                consideration: this.newInfo.consideration1,
                option: 'one',
                weighting: this.newInfo.weighting
            });
            //clear newInfo
            this.newInfo = {
                consideration: '',
                option: 'one',
                weighting: 5
            };
            // this.decisionMade = true;
            e.preventDefault();
            this.orderInfo();
        },
        addConsiderationCON: function(e) {
            // console.log('added');
            this.info.push({
                consideration: this.newInfo.consideration2,
                option: 'two',
                weighting: this.newInfo.weighting
            });
            //clear newInfo
            this.newInfo = {
                consideration: '',
                option: 'one',
                weighting: 5
            };
            // this.decisionMade = true;
            e.preventDefault();
            this.orderInfo();
        },
        showInfo: function() {
            for (var i = 0; i < this.info.length; i++) {
                console.log(i + ". consideration:" + this.info[i].consideration + ", weighting: " + this.info[i].weighting + ", option: " + this.info[i].option);
            }
        },
        editConsideration: function() {
            if (this.edit == true) {
                this.edit = false;
            } else {
                this.edit = true;
            }
            console.log("edit: " + this.edit);
        },
        orderInfo: function() {
            // console.log("order info");
            this.info.sort(function(a, b) {
                return a.weighting - b.weighting;
            });
            this.info.reverse();
            this.makeDecision();
        },
        toggleColumn: function(index) {
            if (this.info[index].option == "one") {
                this.info[index].option = "two";
            } else {
                this.info[index].option = "one";
            }
            // console.log("consideration: " + this.info[index].consideration);
            e.preventDefault();
        },
        makeDecision: function() {
            this.result = 0;
            for (var i = 0; i < this.info.length; i++) {
                if (this.info[i].option === 'one') {
                    this.result += +this.info[i].weighting;
                } else {
                    this.result -= +this.info[i].weighting;
                }
                // console.log(i + ". consideration:" + this.info[i].consideration + ", weighting: " + this.info[i].weighting + ", option: " + this.info[i].option);
            }
            // console.log("result: " + this.result);
            this.percentage = Math.round((this.result / this.info.length) * 10) / 10;
            this.normalisedResult = Math.round(this.percentage);
            switch (this.normalisedResult) {
                case 1:
                    this.outcome1 = 'Slightly good idea,';
                    this.outcome2 = '  in favour of your decision.';
                    break;
                case 2:
                    this.outcome = 'Could be a good idea, ';
                    this.outcome2 = '  in favour of your decision.';
                    break;
                case 3:
                    this.outcome = 'Seems like a good idea, ';
                    this.outcome2 = '  in favour of your decision.';
                    break;
                case 4:
                    this.outcome = 'Good idea, ';
                    this.outcome2 = '  in favour of your decision.';
                    break;
                case 5:
                    this.outcome = 'Probably should do it, ';
                    this.outcome2 = '  in favour of your decision.';
                    break;
                case 6:
                    this.outcome = 'Should do it, ';
                    this.outcome2 = '  in favour of your decision.';
                    break;
                case 7:
                    this.outcome = 'Great idea, ';
                    this.outcome2 = '  in favour of your decision.';
                    break;
                case 8:
                    this.outcome = 'Excellent decision, ';
                    this.outcome2 = '  in favour of your decision.';
                    break;
                case 9:
                    this.outcome = 'Go for it, ';
                    this.outcome2 = '  in favour of your decision.';
                    break;
                case 10:
                    this.outcome = 'Definitely do it, ';
                    this.outcome2 = '  in favour of your decision.';
                    break;
                case 0:
                    this.outcome = 'Makes no odds either way';
                    break;
                case -1:
                    this.outcome = 'Slightly bad idea, ';
                    this.outcome2 = '  against your decision.';
                    break;
                case -2:
                    this.outcome = 'Could be a bad idea, ';
                    this.outcome2 = '  against your decision.';
                    break;
                case -3:
                    this.outcome = 'Seems like a bad idea, ';
                    this.outcome2 = '  against your decision.';
                    break;
                case -4:
                    this.outcome = 'Bad idea, ';
                    this.outcome2 = '  against your decision.';
                    break;
                case -5:
                    this.outcome = 'Probably shouldn\'t do it, ';
                    this.outcome2 = '  against your decision.';
                    break;
                case -6:
                    this.outcome = 'Shouldn\'t do it, ';
                    this.outcome2 = '  against your decision.';
                    break;
                case -7:
                    this.outcome = 'Terrible idea, ';
                    this.outcome2 = '  against your decision.';
                    break;
                case -8:
                    this.outcome = 'Awful idea, ';
                    this.outcome2 = '  against your decision.';
                    break;
                case -9:
                    this.outcome = 'Don\'t do it, ';
                    this.outcome2 = '  against your decision.';
                    break;
                case -10:
                    this.outcome = 'Definitely not, ';
                    this.outcome2 = '  against your decision.';
                    break;
                default:

            }
        }
    }
}

</script>
