<template>
<div>

    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/style.css" media="screen" type="text/css" />
  

    <div class="code-editor">
        <span class="control"></span>
        <span class="control"></span>
        <span class="control"></span>
        <pre class="numbers linenums prettyprint prettyprinted">
          <ol class="linenums">
            <li class="L0">
              <code class="css">
                <span class="pln">describe</span>
                <span class="pun">(</span>
                <span class="str">'Connection'</span>
                <span class="pun">,</span>
                <span class="pln"> </span>
                <span class="kwd">function</span>
                <span class="pun">(){</span>
              </code>
            </li>
            <li class="L1">
              <code class="css">
                <span class="pln">  </span>
                <span class="kwd">var</span>
                <span class="pln"> db </span>
                <span class="pun">=</span>
                <span class="pln"> </span>
                <span class="kwd">new</span>
                <span class="pln"> </span>
                <span class="typ">Connection</span>
              </code>
            </li>
            <li class="L2">
              <code class="css">
                <span class="pln">    </span>
                <span class="pun">,</span>
                <span class="pln"> tobi </span>
                <span class="pun">=</span>
                <span class="pln"> </span>
                <span class="kwd">new</span>
                <span class="pln"> </span>
                <span class="typ">User</span>
                <span class="pun">(</span>
                <span class="str">'tobi'</span>
                <span class="pun">)</span>
              </code>
            </li>
            <li class="L3">
              <code class="css">
                <span class="pln">    </span>
                <span class="pun">,</span>
                <span class="pln"> loki </span>
                <span class="pun">=</span>
                <span class="pln"> </span>
                <span class="kwd">new</span>
                <span class="pln"> </span>
                <span class="typ">User</span>
                <span class="pun">(</span>
                <span class="str">'loki'</span>
                <span class="pun">)</span>
              </code>
            </li>
            <li class="L4">
              <code class="css">
                <span class="pln">    </span>
                <span class="pun">,</span>
                <span class="pln"> jane </span>
                <span class="pun">=</span>
                <span class="pln"> </span>
                <span class="kwd">new</span>
                <span class="pln"> </span>
                <span class="typ">User</span>
                <span class="pun">(</span>
                <span class="str">'jane'</span>
                <span class="pun">);</span>
              </code>
            </li>
          </ol>
        </pre>
      </div>
  
</div>

</template>
<script>
import jquery from "./jquery.js";
import prettify from "./prettify.js";
export default {
  
}
</script>
