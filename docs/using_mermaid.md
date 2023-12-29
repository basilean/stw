# Using Mermaid
This is a flowchart made by text in a code block with **mermaid** label.

``` mermaid
graph TD
    subgraph Server GNU/Linux
        SO["Plugin Memory"]-->Collectd["Agent"]
        JVM["Plugin GC"]-->Collectd
        Collectd-->PluginNetwork["Plugin Network"]
    end
    PluginNetwork-- TCP -->Server["Collectd Remote Server"];
```

\`\`\` mermaid  
graph TD  
    subgraph Server GNU/Linux  
        SO["Plugin Memory"]-->Collectd["Agent"]  
        JVM["Plugin GC"]-->Collectd  
        Collectd-->PluginNetwork["Plugin Network"]  
    end  
    PluginNetwork-- TCP -->Server["Collectd Remote Server"];  
\`\`\`

If you are not seeing it, check your **index.html** and uncomment **script** block sourcing Mermaid library.