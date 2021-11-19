<?php
require_once __DIR__ . "/../api/sexpert-status.php";

function get_alert(){
    return _get_config()->disclaimer;
}

function form_creation(){
    ob_start();
    ?>
    <div class="alert">
        <?php echo get_alert() ?>
    </div>
    <div class="sexpert-form">
        <div class="basic-info">
            <div style="margin-top: 3px">
                <strong>Email</strong>
                <br><br>
                <strong>Age</strong>
            </div>

            <div>
                <input class="sexpert-form-input" type="text" id="email">
                <input class="sexpert-form-input" type="number" min="1" id="age"/>
            </div>
        </div>


        <strong>Gender</strong>
        <div>
            <div class="gender-row" id="pc_gen">
                <div class="gender-col">
                    <input type="radio" name="gender" value="0" id="female" />
                    <label for="female">Cisgender Woman</label>
                    <br>
                    <input type="radio" name="gender" value="2" id="transmale"/>
                    <label for="transmale">Transgender Man</label>
                    <br>
                    <input type="radio" name="gender" value="4" id="notlisted"  />
                    <label for="notlisted">Other Gender Identity</label>
                </div>
                <div class="gender-col">
                    <input type="radio" name="gender" value="1" id="male" />
                    <label for="male">Cisgender Man</label>
                    <br>
                    <input type="radio" name="gender" value="3" id="transfemale" />
                    <label for="transfemale">Transgender Woman</label>
                    <br>
                    <input type="radio" name="gender" value="5" id="prefernottosay"  />
                    <label for="prefernottosay">Prefer Not to Say</label>
                    <br>
                </div>
                <div class="gender-col">
                    <input type="radio" name="gender" value="6" id="nonbinary" />
                    <label for="nonbinary">Non-binary / Genderqueer</label>
                    <br>
                    <input type="radio" name="gender" value="7" id="transnonbinary" />
                    <label for="transnonbinary">Questioning / I am not sure</label>
                    <br>
                </div>
            </div>

            <div class="gender-col" id="mobile_gen">
                <input type="radio" name="gender" value="0" id="female" />
                <label for="female">Cisgender Woman</label>
                <br>
                <input type="radio" name="gender" value="1" id="male" />
                <label for="male">Cisgender Man</label>
                <br>
                <input type="radio" name="gender" value="3" id="transfemale" />
                <label for="transfemale">Transgender Woman</label>
                <br>
                <input type="radio" name="gender" value="2" id="transmale"/>
                <label for="transmale">Transgender Man</label>
                <br>
                <input type="radio" name="gender" value="6" id="nonbinary" />
                <label for="nonbinary">Non-binary / Genderqueer</label>
                <br>
                <input type="radio" name="gender" value="4" id="notlisted"  />
                <label for="notlisted">Other Gender Identity</label>
                <br>
                <input type="radio" name="gender" value="5" id="prefernottosay"  />
                <label for="prefernottosay">Prefer Not to Say</label>
                <br>
                <input type="radio" name="gender" value="7" id="transnonbinary" />
                <label for="transnonbinary">Questioning / I am not sure</label>
                <br>
            </div>
            <div id="not_listed_specify"></div>
        </div>
        <br>
        <strong>Country or Region</strong>
        <select class="sexpert-form-select" id="country"></select>
        <br><br>

        <strong class="message">Message</strong>
        <textarea id="message" placeholder="Enter text here…"></textarea>
        <br>
        <button style="overflow: visible;" onclick="submit_inquiry()">Submit</button>
    </div>
    <script>

        window.onresize = ()=>{
            if (window.innerWidth < 730){
                document.getElementById("mobile_gen").style.display = "block";
                document.getElementById("pc_gen").style.display = "none";
            } else {
                document.getElementById("mobile_gen").style.display = "none";
                document.getElementById("pc_gen").style.display = "";
            }
        };
        window.onresize(undefined);
    </script>
    <?php
    return ob_get_clean();
}


function form_off(){
    $disabled_banner = _get_config()->disabled_banner;
    return "<p>$disabled_banner</p>";
}